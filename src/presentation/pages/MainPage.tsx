import { ReactElement, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { IconButton } from "../components/IconButton";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { css } from "@emotion/react";
import { ImageFrame } from "../components/Frame";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import PhonelinkRingIcon from "@mui/icons-material/PhonelinkRing";
import { logoStyles, titleStyles2, typoStyles } from "../atomics/typo";
import { pageStyles } from "../atomics/styles/page";
import { ListButtonWithDesc } from "../patterns/ListButton";

import { Accordion } from "../patterns/Accordion";
import { List } from "../components/List";
import { MainHeader } from "../patterns/Header";
import { UserInfo } from "../patterns/UserInfo";
import { useUserStore } from "@/data/userRepository";
import { useGroundRepository } from "@/data/groundRepository";
import { off, onValue } from "firebase/database";
import { Ground } from "@/domain/ground";
import { GroundListItem } from "../patterns/GroundList";

const MainPageGroundsListAccordion = (): ReactElement => {
  const { user } = useUserStore();
  const { getUserGrounds } = useGroundRepository();
  const [grounds, setGrounds] = useState<Ground[]>([]);
  useEffect(() => {
    if (user == null) return;
    const groundsRef = getUserGrounds();
    onValue(groundsRef, (snapshot) => {
      setGrounds(snapshot.val());
    });
    return () => {
      off(groundsRef);
    };
  }, [user, getUserGrounds]);
  if (user == null || grounds == null) return <></>;
  return (
    <Accordion>
      <List>
        <h3
          css={(theme) => css`
            text-align: center;
            ${titleStyles2}
            color:${theme.colors.onBackground};
          `}
        >
          그라운드 목록
        </h3>
        {grounds.map((ground) => (
          <GroundListItem key={ground.createdAt} ground={ground} />
        ))}
      </List>
    </Accordion>
  );
};
export const MainPage = (): ReactElement => {
  const { insertGround } = useGroundRepository();
  return (
    <div css={pageStyles}>
      <MainHeader />

      <UserInfo />

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
      <MainPageGroundsListAccordion />
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
