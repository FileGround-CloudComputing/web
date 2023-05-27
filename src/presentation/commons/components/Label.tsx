import { css } from "@emotion/react";
import { ReactElement } from "react";
import { labelStyles, typoStyles3 } from "../atomics/typo";
import { HTMLProps } from "react";
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

interface LabelProps extends HTMLProps<HTMLLabelElement> {
  id: string;
  label?: string;
}
const BaseLabel = ({ label, id, ...props }: LabelProps) => {
  return (
    <label htmlFor={id} {...props}>
      {props.children}
      {label}
    </label>
  );
};
export const DetailFormLabel = (props: LabelProps) => {
  return (
    <BaseLabel
      {...props}
      css={(theme) => css`
        ${labelStyles}
        color: ${theme.colors.secondary};
      `}
    />
  );
};
export const SuccessFormLabel = (props: LabelProps) => {
  return (
    <BaseLabel
      {...props}
      css={(theme) => css`
        color: ${theme.colors.success};
        fill: ${theme.colors.success};
        ${labelStyles}
        display: flex;
        align-items: center;
      `}
    />
  );
};

export const ErrorFormLabel = (props: LabelProps) => {
  return (
    <BaseLabel
      {...props}
      css={(theme) => css`
        color: ${theme.colors.error};
        fill: ${theme.colors.error};
        ${labelStyles}
        display: flex;
        align-items: center;
      `}
    />
  );
};
