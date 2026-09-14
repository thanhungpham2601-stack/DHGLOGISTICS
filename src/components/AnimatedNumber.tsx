import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

interface AnimatedNumberProps {
  value: string;
  className?: string;
}

/** Parses a stat string like "500+" or "63" and count-up-animates the numeric part on scroll into view. */
export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const match = value.match(/[\d.]+/);
  const numeric = match ? parseFloat(match[0]) : 0;
  const prefix = match ? value.slice(0, match.index) : '';
  const suffix = match ? value.slice((match.index ?? 0) + match[0].length) : value;

  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1400, bounce: 0 });

  useEffect(() => {
    if (isInView) motionValue.set(numeric);
  }, [isInView, numeric, motionValue]);

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
  }, [spring, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
