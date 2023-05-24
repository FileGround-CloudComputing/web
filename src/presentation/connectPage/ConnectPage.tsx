import { ReactElement } from "react";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import PhonelinkRingIcon from "@mui/icons-material/PhonelinkRing";
import { pageStyles } from "../commons/atomics/styles/page";
import { ListButtonWithDesc } from "../commons/patterns/ListButton";
import { MainHeader } from "../commons/patterns/Header";
import { UserInfo } from "../commons/patterns/UserInfo";
import { useGroundRepository } from "@/data/groundRepository";
import { IconButton } from "../commons/components/IconButton";
import { css } from "@emotion/react";
import { titleStyles1 } from "../commons/atomics/typo";
import { NumIndicator } from "../commons/components/Indicator";
import { NumPad } from "./patterns/Numpad";

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
  const { insertGround } = useGroundRepository();
  return (
    <div css={pageStyles}>
      <ConnectValueDisplay value={"1234"} />
      <NumPad />
      <ListButtonWithDesc
        icon={<WebStoriesIcon />}
        title={"그라운드 만들기"}
        description="공유를 시작해보세요!"
      />
      <ListButtonWithDesc
        icon={<PhonelinkRingIcon />}
        title={"그라운드 접속하기"}
        description="기존 공유에 접속하세요!"
      />
      <button
        onClick={() => {
          insertGround("test");
        }}
      >
        그라운드 생성하기
      </button>
    </div>
  );
};
