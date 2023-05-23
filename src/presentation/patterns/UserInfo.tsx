import { css } from "@emotion/react";
import { ReactElement } from "react";
import { typoStyles } from "../atomics/typo";
import { useUserStore } from "@/data/userRepository";
import { ImageFrame } from "../components/Frame";

export const UserInfo = (): ReactElement => {
  const { user } = useUserStore();
  if (user == null) return <></>;
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
      `}
    >
      <ImageFrame>
        <img
          src={
            user?.photoURL ?? "https://www.w3schools.com/howto/img_avatar.png"
          }
          css={css`
            width: 120px;
            height: 120px;
            border-radius: 100%;
          `}
        />
      </ImageFrame>
      <h3
        css={(theme) => css`
          ${typoStyles}
          font-weight: 900;
          font-size: 2rem;
          color: ${theme.colors.onBackground};
        `}
      >
        {user?.displayName}
      </h3>
    </div>
  );
};
