import { useState } from "react";
import DisplayUserData from "../dispaly-user-data/DispalyUserData";
import EditUserData from "../edit-user-data/EditUserData";

const UserData: React.FC = () => {
  const [isEdition, setIsEdition] = useState<boolean>(false);

  const handleEdition = () => {
    setIsEdition(!isEdition);
  };

  return (
    <>
      {isEdition ? (
        <EditUserData handleEdition={handleEdition} />
      ) : (
        <DisplayUserData handleEdition={handleEdition} />
      )}
    </>
  );
};

export default UserData;
