import { ReactElement, useState } from "react";
import { pageStyles } from "../commons/atomics/styles/page";
import { useGroundRepository } from "@/data/groundRepository";
import { css } from "@emotion/react";
import { titleStyles1, typoStyles3 } from "../commons/atomics/typo";
import { NumIndicator } from "../commons/components/Indicator";
import { NumPad } from "./patterns/Numpad";
import { get } from "firebase/database";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../commons/components/Button";
import { useSnackbarStore } from "@/data/snackbarStore";
import { Header } from "../commons/components/Header";
import { MAIN_PATH } from "@/domain/paths";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { DetailFormLabel } from "../commons/components/Label";
import { TextFieldWithValidation } from "../commons/patterns/TextFieldWith";
import { CheckBox } from "../commons/components/CheckBox";
interface ConnectValueDisplayProps {
  value: string;
}
export const ConnectValueDisplay = ({
  value,
}: ConnectValueDisplayProps): ReactElement => {
  const values = [...Array(6)].map((_, i) => {
    return value[i] ?? null;
  });

  return (
    <div
      css={css`
        display: flex;
        gap: 8px;
      `}
    >
      {values.map((ch) => {
        if (ch == null) {
          return (
            <NumIndicator
              css={css`
                flex: 1;
                aspect-ratio: 1;
              `}
              isActive={false}
            />
          );
        }
        return (
          <NumIndicator
            css={css`
              ${titleStyles1}
              flex: 1;
              aspect-ratio: 1;
            `}
            isActive={true}
          >
            {ch}
          </NumIndicator>
        );
      })}
    </div>
  );
};
interface ConnectInput {
  password?: string;
}
export const ConnectPage = (): ReactElement => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<ConnectInput>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      password: "aaaa",
    },
  });
  const { getGroundById } = useGroundRepository();
  const [value, setValue] = useState("");
  const [isSecure, setIsSecure] = useState(false);
  const { addSnackbar } = useSnackbarStore();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      if (value.length < 6) {
        return;
      }
      const data = (
        await get(
          getGroundById(value, isSecure ? getValues().password : undefined)
        )
      ).val();

      if (data == null) {
        addSnackbar({ message: "잘못된 코드입니다.", type: "error" });
        return;
      }
      if (isSecure) {
        navigate(`/${Number.parseInt(value)}/${getValues().password}`);
      } else {
        navigate(`/${Number.parseInt(value)}`);
      }
      return data;
    },
    mutationKey: ["getGroundById", value],
  });
  const handleInput = (ch: string | null) => {
    if (ch == null) {
      setValue(value.slice(0, -1));
      return;
    }
    if (value.length >= 6) {
      return;
    }
    const tmp = value + ch;
    setValue(tmp);
  };
  return (
    <>
      <Header backPath={MAIN_PATH} title="그라운드 연결" />
      <div
        css={[
          pageStyles,
          css`
            flex: 1;
          `,
        ]}
      >
        <ConnectValueDisplay value={value} />
        <NumPad handleInput={handleInput} />
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
        <Button
          onClick={() => {
            mutate();
          }}
          loading={isLoading}
        >
          Connect
        </Button>
      </div>
    </>
  );
};
