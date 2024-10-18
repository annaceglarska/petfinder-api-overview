import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getPetfinderTokenAsync } from "./slices/config/config.api-actions";
import { isPetfinderTokenReady } from "./slices/config/config.slice";
import TokenService from "./services/token/token";
import { saveToken } from "./slices/user/user.slice";
import { getUserAsync } from "./slices/user/user.api-actions";
import { Navigation } from "./components/navigation/Navigation";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPetfinderTokenAsync());
  }, []);

  useEffect(() => {
    const token = TokenService.getToken() || undefined;
    if (!token || !TokenService.validateToken(token)) {
      return;
    }
    dispatch(saveToken({ token }));
    dispatch(getUserAsync());
  }, []);

  const isTokenReady = useAppSelector(isPetfinderTokenReady);

  return (
    <Container maxWidth="xl">
      <main>
        {isTokenReady ? (
          <>
            <Navigation />
            <Outlet />
          </>
        ) : (
          <></>
        )}
      </main>
    </Container>
  );
};

export default App;
