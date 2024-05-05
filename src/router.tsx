import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Start from "./views/start/Start";
import Dogs from "./views/dogs/Dogs";
import Cats from "./views/cats/Cats";
import { Main } from "./views/main/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Start />,
        children: [
          {
            path: "/",
            element: <Main />,
          },
          {
            path: "/dogs",
            element: <Dogs />,
          },
          {
            path: "/cats",
            element: <Cats />,
          },
        ],
      },
    ],
  },
]);
