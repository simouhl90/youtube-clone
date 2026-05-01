'use client';

import { useState, useRef, useCallback } from 'react';

interface PullToRefreshResult {
  handlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
  isPulling: boolean;
  pullDistance: number;
}

export function usePullToRefresh(onRefresh: () => void): PullToRefreshResult {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const PULL_THRESHOLD = 80;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    // Only trigger if at top of scroll
    const target = e.currentTarget as HTMLElement;
    if (target.scrollTop <= 0) {
      startY.current = e.touches[0].clientY;
    }
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const diff = e.touches[0].clientY - startY.current;
    if (diff > 0 && diff < 150) {
      setIsPulling(true);
      setPullDistance(Math.min(diff * 0.5, 60));
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (pullDistance >= PULL_THRESHOLD * 0.5) {
      onRefresh();
    }
    setIsPulling(false);
    setPullDistance(0);
    startY.current = 0;
  }, [pullDistance, onRefresh]);

  return {
    handlers: { onTouchStart, onTouchMove, onTouchEnd },
    isPulling,
    pullDistance,
  };
}
