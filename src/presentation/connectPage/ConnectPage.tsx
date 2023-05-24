import { ReactElement, useState } from "react";
import { pageStyles } from "../commons/atomics/styles/page";
import { useGroundRepository } from "@/data/groundRepository";
import { css } from "@emotion/react";
import { titleStyles1 } from "../commons/atomics/typo";
import { NumIndicator } from "../commons/components/Indicator";
import { NumPad } from "./patterns/Numpad";
import { get } from "firebase/database";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../commons/components/Button";
import { useSnackbarStore } from "@/data/snackbarStore";
import { Header } from "../commons/components/Header";
import { MAIN_PATH } from "@/domain/paths";
import { useNavigate } from "react-router-dom";
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

export const ConnectPage = (): ReactElement => {
  const { getGroundById } = useGroundRepository();
  const [value, setValue] = useState("");
  const { addSnackbar } = useSnackbarStore();
  const navigate = useNavigate();
  const { mutate, data, isLoading } = useMutation({
    mutationFn: async () => {
      if (value.length < 6) {
        return;
      }
      const data = (await get(getGroundById(value))).val();

      if (data == null) {
        addSnackbar({ message: "잘못된 코드입니다.", type: "error" });
        return;
      }
      navigate(`/${Number.parseInt(value)}`);
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
            justify-content: center;
          `,
        ]}
      >
        <ConnectValueDisplay value={value} />
        <NumPad handleInput={handleInput} />
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
