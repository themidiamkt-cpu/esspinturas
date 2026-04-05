import { useEffect, useState } from "react";

const FALLBACK_SRC = "/images/fallback-premium.jpg";

function SmartImage({ src, alt, className = "", loading = "lazy", ...rest }) {
  const [currentSrc, setCurrentSrc] = useState(src || FALLBACK_SRC);

  useEffect(() => {
    setCurrentSrc(src || FALLBACK_SRC);
  }, [src]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      className={className}
      onError={() => setCurrentSrc(FALLBACK_SRC)}
      {...rest}
    />
  );
}

export default SmartImage;
