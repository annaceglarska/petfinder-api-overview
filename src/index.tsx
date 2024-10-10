import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeContext } from "@emotion/react";
import { createTheme } from "@mui/material";
import "./config/i18next";

const container = document.getElementById("root")!;
const root = createRoot(container);
const theme = createTheme();

root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeContext.Provider value={theme}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeContext.Provider>
    </LocalizationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
