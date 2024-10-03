import React from "react";
import { Outlet } from "react-router-dom";

const PetsMain: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default PetsMain;
