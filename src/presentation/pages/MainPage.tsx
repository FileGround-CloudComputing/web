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
import GoogleIcon from "@mui/icons-material/Google";

import { Accordion } from "../patterns/Accordion";
import { List, ListItem } from "../components/List";
export const MainPage = (): ReactElement => {
  return (
    <div css={pageStyles}>
      <div
        css={css`
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: end;
        `}
      >
        <h1
          css={(theme) => css`
            ${logoStyles}
            flex:1;
            color: ${theme.colors.onBackground};
          `}
        >
          파일그라운드
        </h1>
        <Button
          css={css`
            width: 100px;
          `}
        >
          <GoogleIcon />
          로그인
        </Button>
      </div>
      <ImageFrame
        src={
          "https://images.unsplash.com/photo-1634129366530-61d3e56a84fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
        }
      />
      <h3
        css={(theme) => css`
          ${typoStyles}
          font-weight: 900;
          font-size: 2rem;
          color: ${theme.colors.onBackground};
        `}
      >
        심규진
      </h3>

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
