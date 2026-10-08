"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale";
};

/**
 * Fades/slides its children in once they enter the viewport.
 * Pure IntersectionObserver + CSS transitions (see `.reveal` in globals.css).
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  variant = "up",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref}
      className={`reveal ${className}`}
      data-variant={variant}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Component>
  );
}
