import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getPetfinderTokenAsync } from "./slices/config/config.api-actions";
import { isPetfinderTokenReady } from "./slices/config/config.slice";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPetfinderTokenAsync());
  }, []);

  const isTokenReady = useAppSelector(isPetfinderTokenReady);

  return (
    <Container maxWidth="xl">
      <main>{isTokenReady ? <Outlet /> : <></>}</main>
    </Container>
  );
};

export default App;
