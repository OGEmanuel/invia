import { useRef } from 'react';

export const useSwipe = (props: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setOpen } = props;
  const startY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === null) return;

    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY.current;

    // swipe down threshold
    if (deltaY > 120) {
      setOpen(false);
      startY.current = null;
    }
  };

  const handleTouchEnd = () => {
    startY.current = null;
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
