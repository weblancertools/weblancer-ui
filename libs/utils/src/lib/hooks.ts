import { useEffect } from 'react';

export const useWeblancerEffect = (
  effect: React.EffectCallback,
  deps?: React.DependencyList | undefined
) => {
  useEffect(() => {
    let destructor: void | (() => void);
    let cancelled = false;

    setTimeout(() => {
      if (cancelled) return;
      destructor = effect();
    }, 0);

    return () => {
      cancelled = true;
      destructor?.();
    };
  }, deps);
};
