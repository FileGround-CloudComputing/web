import { css } from "@emotion/react";
import { ReactNode, useState } from "react";
import { IconButton } from "../components/IconButton";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { transitionStyles } from "../atomics/styles/transition";
import { MotionDiv } from "../components/Motion";
interface AccordionProps {
  children: ReactNode;
}
export const Accordion = ({ children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 24px;
      `}
    >
      <IconButton
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <AddRoundedIcon
          css={(theme) => css`
            fill: ${theme.colors.onBackground};
            transform: rotate(${isOpen ? 45 : 0}deg);
            ${transitionStyles};
            transition-property: transform;
          `}
        />
      </IconButton>
      {isOpen && (
        <MotionDiv
          css={css`
            ${transitionStyles};
            transition-property: opacity;
            width: 100%;
          `}
        >
          {children}
        </MotionDiv>
      )}
    </div>
  );
};
