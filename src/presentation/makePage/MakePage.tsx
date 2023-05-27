import { ReactElement, useState } from "react";
import { Header } from "../commons/components/Header";
import { pageStyles } from "../commons/atomics/styles/page";
import {
  TextFieldWithLabel,
  TextFieldWithValidation,
} from "../commons/patterns/TextFieldWith";
import { css } from "@emotion/react";
import { typoStyles3 } from "../commons/atomics/typo";
import { CheckBox } from "../commons/components/CheckBox";
import { DetailFormLabel } from "../commons/components/Label";
import { useForm } from "react-hook-form";
import { Button } from "../commons/components/Button";
import { useGroundRepository } from "@/data/groundRepository";
import { useSnackbarStore } from "@/data/snackbarStore";
import { useNavigate } from "react-router-dom";
interface GroundInput {
  title: string;
  password?: string;
}

export const MakePage = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroundInput>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      password: "aaaa",
    },
  });
  const { insertGround } = useGroundRepository();
  const [isSecure, setIsSecure] = useState(false);
  const { addSnackbar } = useSnackbarStore();
  const navigate = useNavigate();
  const onSubmit = (data: GroundInput) => {
    insertGround(data.title, isSecure ? data.password : undefined)
      .then((key) => {
        addSnackbar({ message: "생성되었습니다.", type: "success" });
        navigate(`/${key}`, { replace: true });
      })
      .catch((e) => {
        console.error(e);
        addSnackbar({ message: "생성에 실패했습니다.", type: "error" });
      });
  };
  return (
    <>
      <Header />
      <form css={[pageStyles]} onSubmit={handleSubmit(onSubmit)}>
        <TextFieldWithLabel
          label="제목"
          css={(theme) => css`
            ${typoStyles3}
            color: ${theme.colors.onBackground};
          `}
          {...register("title", { required: true })}
        />
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 4px;
          `}
        >
          <DetailFormLabel id={"secure"}>암호화</DetailFormLabel>
          <CheckBox
            id={"secure"}
            onChange={(e) => {
              setIsSecure(e.currentTarget.checked);
            }}
          />
        </div>
        {isSecure && (
          <TextFieldWithValidation
            label="비밀번호(영문 소문자 4자리)"
            css={(theme) => css`
              ${typoStyles3}
              color: ${theme.colors.onBackground};
            `}
            maxLength={4}
            minLength={4}
            error={errors.password}
            {...register("password", {
              required: true,
              validate: {
                empty: (value) => {
                  if (!isSecure && value === undefined) {
                    return true;
                  }
                  if (value === undefined || value === "")
                    return "입력해주세요.";
                  return true;
                },
                aa: (value) => {
                  if (!isSecure && value === undefined) {
                    return true;
                  }
                  if (value === undefined) return "입력해주세요.";
                  return /[a-z]{4}/.test(value) ? true : "영문 4자리";
                },
                maxLength: (value) => {
                  if (!isSecure && value === undefined) {
                    return true;
                  }
                  if (value === undefined) return "입력해주세요.";
                  return value.length === 4 ? true : "4자리";
                },
              },
            })}
          />
        )}
        <Button type="submit">생성하기</Button>
      </form>
    </>
  );
};
