import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { ReactElement } from "react";
import { Photo } from "@/domain/photo";
import { Img } from "@/presentation/commons/components/Img";
import { css } from "@emotion/react";
// @ts-ignore
import { Pagination } from "swiper";
interface PhotoSwiperProps {
  photos: Photo[];
  start: number;
  handleSlideChange: (idx: number) => void;
}
export const PhotoSwiper = ({
  photos,
  start,
  handleSlideChange,
}: PhotoSwiperProps): ReactElement => {
  return (
    <Swiper
      onSwiper={(swiper) => {
        swiper.slideTo(start, 0);
      }}
      onSlideChange={(swiper) => {
        handleSlideChange(swiper.activeIndex);
      }}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      css={css`
        width: 100%;
      `}
    >
      {photos.map((photo) => (
        <SwiperSlide>
          <Img
            src={photo.blob == null ? "" : URL.createObjectURL(photo.blob)}
            css={css`
              width: 100%;
              object-fit: cover;
              aspect-ratio: 1;
              border-radius: 36px;
            `}
            key={photo.src}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
