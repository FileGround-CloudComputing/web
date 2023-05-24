import {
  titleStyles1,
  titleStyles2,
} from "@/presentation/commons/atomics/typo";
import { IconButton } from "@/presentation/commons/components/IconButton";
import { css } from "@emotion/react";
import { ReactElement } from "react";
import BackspaceRoundedIcon from "@mui/icons-material/BackspaceRounded";
interface NumPadProps {
  handleInput: (value: string | null) => void;
}
export const NumPad = ({ handleInput }: NumPadProps): ReactElement => {
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
            onClick={() => handleInput(String(i + 1))}
          >
            {i + 1}
          </IconButton>
        );
      })}
      <div></div>
      <IconButton
        css={css`
          width: 75px;
          height: 75px;
          ${titleStyles1}
          font-size: 2.5rem;
        `}
        onClick={() => handleInput(String(0))}
      >
        {0}
      </IconButton>
      <IconButton
        css={css`
          width: 75px;
          height: 75px;
          ${titleStyles1}
          font-size: 2.5rem;
        `}
        onClick={() => handleInput(null)}
      >
        <BackspaceRoundedIcon
          css={css`
            width: 36px;
            height: 36px;
          `}
        />
      </IconButton>
    </div>
  );
};
