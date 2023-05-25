import { ReactElement, useEffect, useState } from "react";
import { css } from "@emotion/react";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import PhonelinkRingIcon from "@mui/icons-material/PhonelinkRing";
import { titleStyles2 } from "../commons/atomics/typo";
import { pageStyles } from "../commons/atomics/styles/page";
import { ListButtonWithDesc } from "../commons/patterns/ListButton";

import { Accordion } from "../commons/patterns/Accordion";
import { List } from "../commons/components/List";
import { MainHeader } from "../commons/patterns/Header";
import { UserInfo } from "../commons/patterns/UserInfo";
import { useUserStore } from "@/data/userRepository";
import { useGroundRepository } from "@/data/groundRepository";
import { off, onValue } from "firebase/database";
import { GroundListItem } from "../commons/patterns/GroundList";
import { Link } from "react-router-dom";
import { CONNECT_PATH } from "@/domain/paths";

const MainPageGroundsListAccordion = (): ReactElement => {
  const { user } = useUserStore();
  const { getUserGrounds } = useGroundRepository();
  const [grounds, setGrounds] = useState<object>({});
  useEffect(() => {
    if (user == null) return;
    const groundsRef = getUserGrounds();
    onValue(groundsRef, (snapshot) => {
      setGrounds(snapshot.val());
    });
    return () => {
      off(groundsRef);
    };
  }, [user]);
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
        {grounds != null &&
          Object.values(grounds).map((ground) => (
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
      <Link
        to={CONNECT_PATH}
        css={css`
          width: 100%;
        `}
      >
        <ListButtonWithDesc
          icon={<PhonelinkRingIcon />}
          title={"그라운드 접속하기"}
          description="기존 공유에 접속하세요!"
        />
      </Link>
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
