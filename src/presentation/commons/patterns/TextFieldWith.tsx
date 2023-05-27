import { forwardRef } from "react";
import { TextField, TextFieldProps } from "../components/TextField";
import { css } from "@emotion/react";
import {
  DetailFormLabel,
  ErrorFormLabel,
  SuccessFormLabel,
} from "../components/Label";
import { genRandomId } from "@/presentation/utils/getRandomId";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { FieldError } from "react-hook-form";
export const TextFieldWithLabel = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, ...props }, ref) => {
    const id = genRandomId();
    return (
      <div
        css={css`
          width: 100%;
          display: flex;
          flex-direction: column;
        `}
      >
        <TextField {...props} ref={ref} id={id} label={label} />
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px;
          `}
        >
          <DetailFormLabel label={label} id={id} />
        </div>
      </div>
    );
  }
);

interface TextFieldWithValidationProps extends Omit<TextFieldProps, "id"> {
  error?: FieldError | undefined;
}
export const TextFieldWithValidation = forwardRef<
  HTMLInputElement,
  TextFieldWithValidationProps
>(({ error, label, ...props }, ref) => {
  const id = genRandomId();
  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        flex-direction: column;
      `}
    >
      <TextField {...props} ref={ref} id={id} label={label} />
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
        `}
      >
        <DetailFormLabel label={label} id={id} />
        {error == undefined ? (
          <SuccessFormLabel label={"완벽합니다."} id={id}>
            <CheckCircleIcon />
          </SuccessFormLabel>
        ) : (
          <ErrorFormLabel label={error?.message} id={id}>
            <CancelIcon />
          </ErrorFormLabel>
        )}
      </div>
    </div>
  );
});
