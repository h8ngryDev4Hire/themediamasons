import { useState, useEffect, useRef, RefObject } from 'react';

interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
): [RefObject<T>, boolean] {
  const elementRef = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsRevealed(entry.isIntersecting);
    }, {
      threshold: options.threshold || 0,
      rootMargin: options.rootMargin || '0px',
      root: options.root || null
    });

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options.threshold, options.rootMargin, options.root]);

  return [elementRef, isRevealed];
}
