import { useState } from 'react';

import { ImageProps } from '@/types/componentsTypes';
import DefaultImg from '@/assets/images/nft.png';

const Image = ({ src, alt, className, style }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setError(true);
  };

  const props = {
    alt,
    className,
    style,
    src: isLoading ? DefaultImg : error ? DefaultImg : src,
    onLoad: handleImageLoad,
    onError: handleImageError
  };

  return <img {...props} />;
};

export { Image };
