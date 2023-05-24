import { css } from "@emotion/react";
import { pageStyles } from "../atomics/styles/page";
import { IconButton } from "../components/IconButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { normalShapeStyles } from "../atomics/styles/shape";
import { titleStyles2 } from "../atomics/typo";
import { Link, useNavigate } from "react-router-dom";
import { ReactElement } from "react";
interface HeaderProps {
  title?: string;
  backPath?: string;
  actions?: ReactElement[];
}
export const Header = ({ title, backPath, actions = [] }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        css={[
          pageStyles,
          css`
            height: 48px;
          `,
        ]}
      ></div>
      <div
        css={(theme) => css`
          position: fixed;
          z-index: 2;
          top: 0px;
          left: calc(50% - min(50%, 190px));
          width: min(100%, 380px);
          background-color: ${theme.colors.darkenBackground};
          ${normalShapeStyles({ theme, size: 2 })}
          height: 48px;
          border-radius: 0px 0px 16px 16px;
          justify-content: center;
          align-items: center;
          display: flex;
          ${titleStyles2}
          color: ${theme.colors.onBackground};
        `}
      >
        {backPath ? (
          <Link
            to={backPath}
            css={css`
              position: absolute;
              left: 24px;
              text-decoration: none !important;
              border: none;
              outline: none;
            `}
          >
            <IconButton shadowSize={3}>
              <ArrowBackIosRoundedIcon />
            </IconButton>
          </Link>
        ) : (
          <IconButton
            shadowSize={3}
            onClick={() => {
              navigate(-1);
            }}
            css={css`
              position: absolute;
              left: 24px;
              text-decoration: none !important;
              border: none;
              outline: none;
            `}
          >
            <ArrowBackIosRoundedIcon />
          </IconButton>
        )}
        {title && <span>{title}</span>}
        <div
          css={css`
            position: absolute;
            right: 24px;
          `}
        >
          {actions.map((comp) => comp)}
        </div>
      </div>
    </>
  );
};
