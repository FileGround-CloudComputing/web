import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "./presentation/mainPage/MainPage";
import { CONNECT_PATH, MAIN_PATH, MAKE_PATH } from "./domain/paths";
import { ConnectPage } from "./presentation/connectPage/ConnectPage";
import { GroundPageEnter } from "./presentation/groundPage/GroundPage";
import { MakePage } from "./presentation/makePage/MakePage";

export const router = createBrowserRouter([
  {
    path: MAIN_PATH,
    element: <MainPage />,
  },
  { path: CONNECT_PATH, element: <ConnectPage /> },
  {
    path: ":groundId",
    element: <GroundPageEnter />,
  },
  {
    path: ":groundId/:password",
    element: <GroundPageEnter />,
  },
  {
    path: MAKE_PATH,
    element: <MakePage />,
  },
]);
