import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Start from "./views/start/Start";
import { Main } from "./views/main/Main";
import Animals from "./views/animals/Animals";

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
            path: "/:animalType",
            element: <Animals />,
          },
        ],
      },
    ],
  },
]);
