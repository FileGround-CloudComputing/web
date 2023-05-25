import { ImgHTMLAttributes, ReactElement, useState } from "react";

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string | undefined;
}
export const Img = ({ src, ...props }: ImgProps): ReactElement => {
  const [localSrc, setLocalSrc] = useState<string | undefined>(src);
  if (!localSrc) {
    return (
      <img
        src={
          "https://cdn.pixabay.com/photo/2018/01/04/15/51/404-error-3060993_1280.png"
        }
        {...props}
      />
    );
  }
  return (
    <img
      src={localSrc}
      {...props}
      onError={() => {
        setLocalSrc(undefined);
      }}
    />
  );
};
