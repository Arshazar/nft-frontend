import { useEffect, useState } from 'react';

const useViewport = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const onResize = () => {
    window && setSize({ width: window.innerWidth, height: window.innerHeight });
  };

  return size;
};

export { useViewport };
