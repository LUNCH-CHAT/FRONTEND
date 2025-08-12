import { useCallback, useRef } from 'react';

interface LongPresssProps {
  delay?: number;
  onLongPress: () => void;
}

export default function useLongPress({ delay = 300, onLongPress }: LongPresssProps) {
  // ref를 통해 즉각 확인
  const timeRef = useRef<number | null>(null); // 타이머 id 저장
  const isPressedRef = useRef(false);

  // 시작 핸들러
  const startPress = useCallback(() => {
    isPressedRef.current = true;

    // timeRef 초기화
    if (timeRef.current) {
      clearTimeout(timeRef.current);
      timeRef.current = null;
    }

    // 타이머 id 반환값 저장
    timeRef.current = window.setTimeout(() => {
      if (isPressedRef.current) {
        onLongPress?.();
      }
    }, delay);
  }, [isPressedRef, delay, onLongPress]);

  // 종료 핸들러
  const endPress = useCallback(() => {
    isPressedRef.current = false;

    if (timeRef.current) {
      clearTimeout(timeRef.current);
      timeRef.current = null;
    }
  }, []);

  return {
    onMouseDown: startPress,
    onMouseUp: endPress,
    onMouseLeave: endPress,
    onTouchStart: startPress,
    onTouchEnd: endPress,
  };
}
