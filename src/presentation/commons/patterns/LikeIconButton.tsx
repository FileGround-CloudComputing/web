import { ButtonHTMLAttributes, ReactElement } from "react";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { IconButton } from "../components/IconButton";
import { css } from "@emotion/react";

interface LikeIconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  liked: boolean;
  shadowSize?: number;
  likedOnClick?: () => void;
  unlikedOnClick?: () => void;
}

export const LikeIconButton = ({
  liked,
  shadowSize,
  likedOnClick,
  unlikedOnClick,
  ...props
}: LikeIconButtonProps): ReactElement => {
  return (
    <IconButton
      shadowSize={shadowSize}
      {...props}
      css={css`
        ${liked ? `color: red;` : `color: gray;`}
      `}
      onClick={() => {
        if (liked) {
          unlikedOnClick?.();
        }
        if (!liked) {
          likedOnClick?.();
        }
      }}
    >
      <FavoriteTwoToneIcon />
    </IconButton>
  );
};
