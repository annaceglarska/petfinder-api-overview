import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Start from "./views/start/Start";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Start />,
      },
    ],
  },
]);
