import { storage } from "@/data/firebase";
import { useGroundRepository } from "@/data/groundRepository";
import { getDownloadURL } from "firebase/storage";
import { ReactElement, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./Skeleton";
interface GroundImgProps {
  path: string;
  className?: string;
}
export const GroundImg = ({
  path,
  className,
}: GroundImgProps): ReactElement => {
  const [src, setSrc] = useState<string | null>(null);
  const { getPhotoUrl } = useGroundRepository();
  useEffect(() => {
    getPhotoUrl(path).then((url) => {
      setSrc(url);
    });
  }, []);
  if (src == null) {
    return <Skeleton className={className} />;
  }
  return <img className={className} src={src} />;
};
