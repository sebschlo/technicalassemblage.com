import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollState } from '../scene/scrollStore';

gsap.registerPlugin(ScrollTrigger);

// Shared Lenis instance so UI (e.g. nav) can drive smooth programmatic scroll.
let lenisInstance: Lenis | null = null;

/** Smooth-scroll to a section by selector/element/offset via Lenis. */
export function scrollToTarget(target: string | HTMLElement | number) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: 0, duration: 1.2 });
  } else if (typeof target !== 'number' && typeof target !== 'string') {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

/** Freeze/unfreeze smooth scrolling (e.g. while a modal is open). */
export function setScrollLocked(locked: boolean) {
  if (!lenisInstance) return;
  if (locked) lenisInstance.stop();
  else lenisInstance.start();
}

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisInstance = lenis;

    lenis.on('scroll', (e: { progress: number; velocity: number }) => {
      scrollState.progress = e.progress;
      scrollState.velocity = e.velocity;
      ScrollTrigger.update();
    });

    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
