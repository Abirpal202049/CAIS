import { useState, useEffect } from 'react';

function useHover(disabled:boolean) {
  console.log('Hovered :');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setIsHovered(false);
    }
  };

  useEffect(() => {
    const element = document.getElementById('sidebar');
    console.log(element)
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [disabled]);

  return isHovered;
}

export default useHover;