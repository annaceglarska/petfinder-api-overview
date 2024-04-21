import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Start from "./views/start/Start";
import Dogs from "./views/dogs/Dogs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Start />,
      },
      {
        path: "/dogs",
        element: <Dogs />,
      },
    ],
  },
]);
