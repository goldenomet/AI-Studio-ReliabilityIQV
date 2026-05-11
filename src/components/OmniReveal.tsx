import React, { useRef, useMemo, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface RevealItemProps {
  children: React.ReactNode;
  index: number;
  total: number;
  progress: any;
  settings: {
    initialOpacity: number;
    initialBlur: number;
    initialScale: number;
  };
}

const RevealItem: React.FC<RevealItemProps> = ({ children, index, total, progress, settings }) => {
  const { initialOpacity, initialBlur, initialScale } = settings;
  const start = index / total;
  const end = (index + 1) / total;
  
  const isComponent = React.isValidElement(children) || (typeof children === 'object' && children !== null);
  
  const opacity = useTransform(progress, [start, end], [isComponent ? Math.max(initialOpacity, 0.4) : initialOpacity, 1]);
  const scale = useTransform(progress, [start, end], [initialScale, 1]);
  const blurValue = useTransform(progress, [start, end], [initialBlur, 0]);
  const filter = useTransform(blurValue, (v) => isComponent ? "none" : `blur(${v}px)`);
  
  return (
    <motion.span
      aria-hidden="true"
      style={{
        display: "inline-block",
        marginRight: "0.25em",
        whiteSpace: "pre-wrap",
        opacity,
        scale,
        filter,
      }}
    >
      {children}
    </motion.span>
  );
};

export interface OmniRevealProps {
  text: string;
  components?: React.ReactNode[];
  scrollHeight?: number;
  stiffness?: number;
  damping?: number;
  initialOpacity?: number;
  initialBlur?: number;
  initialScale?: number;
  className?: string;
  ContainerTag?: any;
}

export const OmniReveal: React.FC<OmniRevealProps> = ({
  text,
  components = [],
  scrollHeight = 1000,
  stiffness = 80,
  damping = 30,
  initialOpacity = 0.3,
  initialBlur = 5,
  initialScale = 0.95,
  className = "",
  ContainerTag = "p"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [startOffset, setStartOffset] = useState(0);

  useEffect(() => {
    const updateOffset = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || window.pageYOffset;
        // Start animation a bit before it reaches the very top to give better feeling
        setStartOffset(scrollTop + rect.top - (window.innerHeight * 0.5));
      }
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  const { scrollY } = useScroll();
  const rawProgress = useTransform(scrollY, [startOffset, startOffset + scrollHeight], [0, 1]);
  const smoothProgress = useSpring(rawProgress, { stiffness, damping });

  const elements = useMemo(() => {
    const parts = text.split(/(\[\])/g);
    let componentIndex = 0;
    const finalArray: { type: string; content: any }[] = [];
    
    parts.forEach((part) => {
      if (part === "[]") {
        finalArray.push({
          type: "component",
          content: components[componentIndex] || null,
        });
        componentIndex++;
      } else {
        const words = part.split(" ").filter((w) => w !== "");
        words.forEach((word) => {
          finalArray.push({ type: "word", content: word });
        });
      }
    });
    return finalArray;
  }, [text, components]);

  return (
    <ContainerTag
      ref={containerRef}
      className={`relative flex flex-wrap items-baseline ${className}`}
      style={{ paddingBottom: scrollHeight }}
    >
      <span
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: "0",
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: "0",
        }}
      >
        {text.replace(/\[\]/g, " (inserted element) ")}
      </span>
      {elements.map((item, i) => (
        <RevealItem
          key={i}
          index={i}
          total={elements.length}
          progress={smoothProgress}
          settings={{ initialOpacity, initialBlur, initialScale }}
        >
          {item.type === "word" ? (
            item.content
          ) : (
            <div style={{ display: "inline-flex", verticalAlign: "middle", margin: "0 4px" }}>
              {item.content}
            </div>
          )}
        </RevealItem>
      ))}
    </ContainerTag>
  );
};
