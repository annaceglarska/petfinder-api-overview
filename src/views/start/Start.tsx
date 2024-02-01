import React, { useEffect } from "react";
import { SignIn } from "../../components/sign-in/SignIn";
// import { useAppDispatch } from "../../app/hooks";
// import { getPetsAsync } from "../../slices/pets/pets.api-actions";

const Start: React.FC = () => {
  // const dispatch = useAppDispatch();
  useEffect(() => {
    // dispatch(
    //   getPetsAsync({
    //     size: "small",
    //   })
    // );
  }, []);
  return <SignIn />;
};

export default Start;
