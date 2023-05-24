import { css } from "@emotion/react";
import { ReactElement } from "react";
import { typoStyles3 } from "../atomics/typo";

export const ErrorLabel = ({ text }: { text: string }): ReactElement => {
  return (
    <label
      css={(theme) =>
        css`
          color: ${theme.colors.error};
          ${typoStyles3}
        `
      }
    >
      {text}
    </label>
  );
};
