import React from "react";
// import { SignIn } from "../../components/sign-in/SignIn";
import { Outlet } from "react-router-dom";
import { Hero } from "../../components/hero/Hero";
import { Navigation } from "../../components/navigation/Navigation";

const Start: React.FC = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <Outlet />
      {/* <SignIn /> */}
    </>
  );
};

export default Start;
