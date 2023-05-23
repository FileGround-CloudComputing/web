import { ReactElement } from "react";
import { Button } from "../components/Button";
import { IconButton } from "../components/IconButton";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { css } from "@emotion/react";
import { ImageFrame } from "../components/Frame";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import PhonelinkRingIcon from "@mui/icons-material/PhonelinkRing";
import { logoStyles, typoStyles } from "../atomics/typo";
import { pageStyles } from "../styles/page";
import { ListButtonWithDesc } from "../patterns/ListButton";

import { Accordion } from "../patterns/Accordion";
import { List, ListItem } from "../components/List";
import { MainHeader } from "../patterns/Header";
import { UserInfo } from "../patterns/UserInfo";
export const MainPage = (): ReactElement => {
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
      <Accordion>
        <List>
          <ListItem>대충 내용</ListItem>
          <ListItem>대충 내용</ListItem>
          <ListItem>대충 내용</ListItem>
        </List>
      </Accordion>
    </div>
  );
};
