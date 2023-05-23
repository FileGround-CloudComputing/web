import { css } from "@emotion/react";
import { ReactElement } from "react";
import { logoStyles } from "../atomics/typo";
import { Button } from "../components/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { useUserRepository, useUserStore } from "@/data/userRepository";

export const MainHeader = (): ReactElement => {
  const { signIn, signOut } = useUserRepository();
  const { user, init } = useUserStore();

  return (
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
      {user == null ? (
        <Button
          css={css`
            width: 100px;
          `}
          onClick={signIn}
          loading={!init}
        >
          <GoogleIcon />
          로그인
        </Button>
      ) : (
        <Button
          css={css`
            width: 100px;
          `}
          onClick={signOut}
        >
          로그아웃
        </Button>
      )}
    </div>
  );
};
