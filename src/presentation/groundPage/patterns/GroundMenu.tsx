import { ReactElement } from "react";
import { css } from "@emotion/react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import { PopOver } from "@/presentation/commons/components/PopOver";
import { IconButton } from "@/presentation/commons/components/IconButton";
// interface GroundMenuProps {
//   ground: Ground;
// }
export const GroundMenu = (): ReactElement => {
  return (
    <PopOver>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          gap: 8px;
        `}
      >
        <IconButton shadowSize={2}>
          <DeleteRoundedIcon />
        </IconButton>
        <IconButton shadowSize={2}>
          <ShareRoundedIcon />
        </IconButton>
      </div>
    </PopOver>
  );
};
