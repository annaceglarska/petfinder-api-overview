import React from "react";
import { Outlet } from "react-router-dom";
import { Hero } from "../../components/hero/Hero";

const Start: React.FC = () => {
  return (
    <>
      <Hero />
      <Outlet />
    </>
  );
};

export default Start;
