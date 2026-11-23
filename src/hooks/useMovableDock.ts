import React, { useState, useEffect, useRef, useCallback } from 'react';

export type DockSide = 'left' | 'right';

interface DockState {
  x: number | null;
  y: number | null;
  docked: DockSide | null;
}

interface UseMovableDockOptions {
  storageKey: string;
  defaultSide: DockSide;
  estimatedWidth?: number;
  estimatedHeight?: number;
  disabled?: boolean;
}

const TOP_SAFE_MARGIN = 76;
const EDGE_MARGIN = 12;
const EDGE_SNAP_THRESHOLD = 16;
const DRAG_THRESHOLD = 6;

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), Math.max(min, max));

export function useMovableDock({
  storageKey,
  defaultSide,
  estimatedWidth = 64,
  estimatedHeight = 64,
  disabled = false,
}: UseMovableDockOptions) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [state, setState] = useState<DockState>(() => {
    if (typeof window === 'undefined') {
      return { x: null, y: null, docked: null };
    }
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          x: typeof parsed.x === 'number' ? parsed.x : null,
          y: typeof parsed.y === 'number' ? parsed.y : null,
          docked: parsed.docked === 'left' || parsed.docked === 'right' ? parsed.docked : null,
        };
      }
    } catch {
      // Ignore storage access failures
    }
    return { x: null, y: null, docked: null };
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dockPreview, setDockPreview] = useState<DockSide | null>(null);

  const stateRef = useRef(state);
  stateRef.current = state;

  const isDraggingRef = useRef(false);
  const justDraggedRef = useRef(false);
  const dockPreviewRef = useRef<DockSide | null>(null);

  // Persist position changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (state.x === null && state.y === null && state.docked === null) {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, JSON.stringify(state));
      }
    } catch {
      // Ignore storage access failures
    }
  }, [state, storageKey]);

  // Keep moved/docked coordinates within viewport bounds on mount and resize
  const clampToViewport = useCallback(() => {
    if (typeof window === 'undefined') return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = containerRef.current?.getBoundingClientRect();
    const w = rect?.width && rect.width > 10 ? rect.width : estimatedWidth;
    const h = rect?.height && rect.height > 10 ? rect.height : estimatedHeight;

    setState((prev) => {
      if (prev.x === null && prev.y === null && prev.docked === null) return prev;
      const nextX =
        prev.x !== null
          ? clamp(prev.x, EDGE_MARGIN, vw - w - EDGE_MARGIN)
          : null;
      const nextY =
        prev.y !== null
          ? clamp(prev.y, TOP_SAFE_MARGIN, vh - h - EDGE_MARGIN)
          : null;
      if (nextX === prev.x && nextY === prev.y) return prev;
      return { ...prev, x: nextX, y: nextY };
    });
  }, [estimatedWidth, estimatedHeight]);

  useEffect(() => {
    clampToViewport();
    window.addEventListener('resize', clampToViewport);
    return () => window.removeEventListener('resize', clampToViewport);
  }, [clampToViewport]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      // Do not hijack drags from explicit non-drag controls (e.g. minimize button or links)
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-no-drag="true"]')) return;

      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const startClientX = e.clientX;
      const startClientY = e.clientY;
      const startLeft = stateRef.current.x ?? rect.left;
      const startTop = stateRef.current.y ?? rect.top;
      const startDocked = stateRef.current.docked;
      const elWidth = rect.width || estimatedWidth;
      const elHeight = rect.height || estimatedHeight;

      let active = false;
      let activeDocked = startDocked;

      const onPointerMove = (moveEvent: PointerEvent) => {
        const dx = moveEvent.clientX - startClientX;
        const dy = moveEvent.clientY - startClientY;

        if (!active && Math.hypot(dx, dy) >= DRAG_THRESHOLD) {
          active = true;
          isDraggingRef.current = true;
          setIsDragging(true);
        }

        if (!active) return;

        const nextY = clamp(startTop + dy, TOP_SAFE_MARGIN, vh - elHeight - EDGE_MARGIN);

        if (activeDocked) {
          // Allow sliding along the edge; pull inward > 42px to undock
          const pulledInward =
            (activeDocked === 'left' && dx > 42) ||
            (activeDocked === 'right' && dx < -42);

          if (pulledInward) {
            const originX = activeDocked === 'left' ? 0 : vw - estimatedWidth;
            activeDocked = null;
            const nextX = clamp(originX + dx, 0, vw - estimatedWidth);
            dockPreviewRef.current = null;
            setDockPreview(null);
            setState({ x: nextX, y: nextY, docked: null });
          } else {
            dockPreviewRef.current = activeDocked;
            setDockPreview(activeDocked);
            setState((prev) => ({ ...prev, y: nextY }));
          }
          return;
        }

        const currentWidth = containerRef.current?.getBoundingClientRect().width || elWidth;
        const nextX = clamp(startLeft + dx, 0, vw - currentWidth);
        let preview: DockSide | null = null;
        if (nextX <= EDGE_SNAP_THRESHOLD) {
          preview = 'left';
        } else if (nextX + currentWidth >= vw - EDGE_SNAP_THRESHOLD) {
          preview = 'right';
        }

        dockPreviewRef.current = preview;
        setDockPreview(preview);
        setState({ x: nextX, y: nextY, docked: null });
      };

      const onPointerUp = () => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);

        if (active) {
          justDraggedRef.current = true;
          window.setTimeout(() => {
            justDraggedRef.current = false;
          }, 80);

          const snapSide = dockPreviewRef.current;
          const liveRect = containerRef.current?.getBoundingClientRect();
          const finalW = liveRect?.width ? Math.max(liveRect.width, estimatedWidth) : Math.max(elWidth, estimatedWidth);
          const finalH = liveRect?.height ? liveRect.height : elHeight;

          setState((prev) => {
            const curY = clamp(
              prev.y ?? startTop,
              TOP_SAFE_MARGIN,
              window.innerHeight - Math.max(finalH, 44) - EDGE_MARGIN
            );

            if (snapSide) {
              const restoreX =
                snapSide === 'left'
                  ? EDGE_MARGIN
                  : Math.max(EDGE_MARGIN, window.innerWidth - estimatedWidth - EDGE_MARGIN);
              return { x: restoreX, y: curY, docked: snapSide };
            }

            if (prev.docked) {
              return { ...prev, y: curY };
            }

            const curX = clamp(
              prev.x ?? startLeft,
              EDGE_MARGIN,
              Math.max(EDGE_MARGIN, window.innerWidth - finalW - EDGE_MARGIN)
            );
            return { x: curX, y: curY, docked: null };
          });
        }

        isDraggingRef.current = false;
        dockPreviewRef.current = null;
        setIsDragging(false);
        setDockPreview(null);
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
    },
    [disabled, estimatedWidth, estimatedHeight]
  );

  const handleClickCapture = useCallback((e: React.MouseEvent) => {
    if (justDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  const minimizeToSide = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (typeof window === 'undefined') return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = containerRef.current?.getBoundingClientRect();
      const curX = stateRef.current.x ?? rect?.left ?? (defaultSide === 'left' ? EDGE_MARGIN : vw - estimatedWidth - EDGE_MARGIN);
      const curW = rect?.width || estimatedWidth;
      const curY = clamp(
        stateRef.current.y ?? rect?.top ?? vh - estimatedHeight - 24,
        TOP_SAFE_MARGIN,
        vh - 56 - EDGE_MARGIN
      );
      const side: DockSide =
        stateRef.current.x !== null || rect
          ? curX + curW / 2 < vw / 2
            ? 'left'
            : 'right'
          : defaultSide;

      setState({
        x: side === 'left' ? EDGE_MARGIN : Math.max(EDGE_MARGIN, vw - estimatedWidth - EDGE_MARGIN),
        y: curY,
        docked: side,
      });
    },
    [defaultSide, estimatedWidth, estimatedHeight]
  );

  const restoreFromSide = useCallback(
    (e?: React.MouseEvent) => {
      if (justDraggedRef.current) return;
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (typeof window === 'undefined') return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setState((prev) => {
        const side = prev.docked || defaultSide;
        const restoreX =
          side === 'left'
            ? EDGE_MARGIN
            : Math.max(EDGE_MARGIN, vw - estimatedWidth - EDGE_MARGIN);
        const restoreY = clamp(
          prev.y ?? vh - estimatedHeight - 24,
          TOP_SAFE_MARGIN,
          vh - estimatedHeight - EDGE_MARGIN
        );
        return { x: restoreX, y: restoreY, docked: null };
      });
    },
    [defaultSide, estimatedWidth, estimatedHeight]
  );

  const isMoved = state.x !== null && state.y !== null;
  const horizontalSide: DockSide = (() => {
    if (state.docked) return state.docked;
    if (typeof window !== 'undefined' && state.x !== null) {
      return state.x + estimatedWidth / 2 < window.innerWidth / 2 ? 'left' : 'right';
    }
    return defaultSide;
  })();

  const positionStyle: React.CSSProperties | undefined = (() => {
    if (state.docked) {
      return {
        top: state.y ?? 140,
        bottom: 'auto',
        left: state.docked === 'left' ? 0 : 'auto',
        right: state.docked === 'right' ? 0 : 'auto',
      };
    }
    if (isMoved) {
      return {
        top: state.y!,
        left: state.x!,
        right: 'auto',
        bottom: 'auto',
      };
    }
    return undefined;
  })();

  return {
    containerRef,
    docked: state.docked,
    isMoved,
    isDragging,
    dockPreview,
    horizontalSide,
    positionStyle,
    handlePointerDown,
    handleClickCapture,
    minimizeToSide,
    restoreFromSide,
  };
}
