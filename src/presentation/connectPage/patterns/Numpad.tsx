import {
  titleStyles1,
  titleStyles2,
} from "@/presentation/commons/atomics/typo";
import { IconButton } from "@/presentation/commons/components/IconButton";
import { css } from "@emotion/react";
import { ReactElement } from "react";

export const NumPad = (): ReactElement => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: space-between;
        align-content: space-between;
        width: 100%;
        aspect-ratio: 1;
        justify-items: center;
      `}
    >
      {[...Array(9)].map((_, i) => {
        return (
          <IconButton
            css={css`
              width: 75px;
              height: 75px;
              ${titleStyles1}
              font-size: 2.5rem;
            `}
            key={i}
          >
            {i + 1}
          </IconButton>
        );
      })}
    </div>
  );
};
