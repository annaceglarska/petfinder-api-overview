import React, { useEffect } from "react";
import UserData from "../../components/user-data/UserData";
import { useAppSelector } from "../../app/hooks";
import { isUserLogged } from "../../slices/user/user.slice";
import { useNavigate } from "react-router-dom";

const UserDashboard: React.FC = () => {
  const isLogged = useAppSelector(isUserLogged);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  }, [isLogged]);

  return (
    <>
      <UserData />
    </>
  );
};

export default UserDashboard;
