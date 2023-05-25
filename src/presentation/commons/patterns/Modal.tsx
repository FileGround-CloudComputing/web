import { css } from "@emotion/react";
import { ReactElement, ReactNode } from "react";
import { titleStyles2 } from "../atomics/typo";

interface ModalProps {
  children: ReactNode;
  className?: string;
  title?: string;
  handleClose: () => void;
}
export const Modal = ({
  children,
  className,
  title,
  handleClose,
}: ModalProps): ReactElement => {
  return (
    <div
      onClick={handleClose}
      css={css`
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 20;
        background-color: rgba(0, 0, 0, 0.5);
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={className}
        css={(theme) => css`
          width: 300px;
          min-height: 200px;
          border-radius: 16px;
          padding: 16px;
          background-color: ${theme.colors.background};
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        `}
      >
        {title && (
          <p
            css={(theme) => css`
              ${titleStyles2}
              color:${theme.colors.onBackground};
              text-align: center;
            `}
          >
            {title}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};
