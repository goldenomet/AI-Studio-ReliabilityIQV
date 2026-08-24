import { useState, useEffect } from 'react';

export const useWidgetVisibility = (idleTimeout = 3000) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    let lastScrollY = window.pageYOffset;
    let idleTimer: ReturnType<typeof setTimeout>;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIsVisible(false);
      }, idleTimeout);
    };

    const handleInteraction = () => {
      setIsVisible(true);
      resetIdleTimer();
    };

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
      handleInteraction();
    };

    window.addEventListener('scroll', updateScrollDirection);
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    idleTimer = setTimeout(() => {
      setIsVisible(false);
    }, idleTimeout + 2000);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(idleTimer);
      window.removeEventListener('scroll', updateScrollDirection);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [scrollDirection, idleTimeout]);

  return { isVisible, scrollDirection };
};
