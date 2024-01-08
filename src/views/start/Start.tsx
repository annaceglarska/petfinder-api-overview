import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getPetsAsync } from "../../slices/pets/pets.api-actions";

const Start: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getPetsAsync({
        size: "small",
      })
    );
  }, []);
  return <div>Start</div>;
};

export default Start;
