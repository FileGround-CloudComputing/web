import { ReactElement, ReactNode, useState } from "react";
import { IconButton } from "./IconButton";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { css } from "@emotion/react";
import OutsideClickHandler from "react-outside-click-handler";
import { MotionDiv } from "./Motion";
import { normalShapeStyles } from "../atomics/styles/shape";

interface PopOverProps {
  children: ReactNode;
}
export const PopOver = ({ children }: PopOverProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setIsOpen(false);
      }}
    >
      <div
        css={css`
          position: relative;
        `}
      >
        <IconButton
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? (
            <MotionDiv>
              <CloseRoundedIcon />
            </MotionDiv>
          ) : (
            <MotionDiv>
              <MoreVertRoundedIcon />
            </MotionDiv>
          )}
        </IconButton>
        {isOpen && (
          <MotionDiv
            css={(theme) => css`
              background-color: ${theme.colors.darkShadow};
              border-radius: 8px;
              ${normalShapeStyles({ theme, size: 2 })}
              z-index: 10;
              bottom: -56px;
              right: 0px;
              padding: 8px;
              position: absolute;
            `}
          >
            {children}
          </MotionDiv>
        )}
      </div>
    </OutsideClickHandler>
  );
};
