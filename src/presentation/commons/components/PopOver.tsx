import { ReactElement, ReactNode, useState } from "react";
import { IconButton } from "./IconButton";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { css } from "@emotion/react";
import OutsideClickHandler from "react-outside-click-handler";
import { MotionDiv } from "./Motion";

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
              background-color: ${theme.colors.background};
              z-index: 10;
              top: -52px;
              right: 0px;
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
