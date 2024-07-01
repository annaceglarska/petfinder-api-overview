import React from "react";
import { Outlet } from "react-router-dom";
import { Hero } from "../../components/hero/Hero";
import { Navigation } from "../../components/navigation/Navigation";

const Start: React.FC = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <Outlet />
    </>
  );
};

export default Start;
