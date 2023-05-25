import { css } from "@emotion/react";
import { ReactElement, ReactNode } from "react";

interface SkeletonProps {
  className?: string;
  children?: ReactNode;
}

export const Skeleton = ({
  className,
  children,
}: SkeletonProps): ReactElement => {
  return (
    <div
      className={className}
      css={css`
        height: 20px;
        border-radius: 16px;
        background-color: #8c8c8c !important;
        cursor: progress !important;
        box-shadow: none !important;
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        &:hover {
          background: transparent !important;
          background-color: #8c8c8c !important;

          box-shadow: none !important;
        }
        &:active {
          background: transparent !important;
          background-color: #8c8c8c !important;

          box-shadow: none !important;
        }
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      `}
    >
      {children}
    </div>
  );
};
