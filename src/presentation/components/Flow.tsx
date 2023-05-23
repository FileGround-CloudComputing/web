import { css } from "@emotion/react";
import { ReactElement, ReactNode, useCallback, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
interface FlowContainerProps {
  children: ReactNode;
}
export const FlowContainer = ({
  children,
}: FlowContainerProps): ReactElement => {
  const [height, setHeight] = useState(0);
  const heightRef = useCallback((node: HTMLDivElement) => {
    if (node == null) return;
    setHeight(node.getBoundingClientRect().height);
  }, []);
  return (
    <>
      <div
        css={css`
          height: ${height}px;
        `}
      />

      <Marquee
        css={css`
          position: absolute;
          overflow-x: visible;
          overflow-y: hidden;
        `}
      >
        <div ref={heightRef}>{children}</div>
      </Marquee>
    </>
  );
};
