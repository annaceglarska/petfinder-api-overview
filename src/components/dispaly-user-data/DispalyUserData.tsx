import { Button } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { getUser } from "../../slices/user/user.slice";

export interface DispalyUserDataProps {
  handleEdition: () => void;
}

const DispalyUserData: React.FC<DispalyUserDataProps> = (props) => {
  const userData = useAppSelector(getUser);
  return (
    <>
      <div>
        <p>
          <b>Name</b>
        </p>
        <p>{userData?.name}</p>
      </div>
      <div>
        <p>
          <b>Surname</b>
        </p>
        <p>{userData?.surname}</p>
      </div>
      <div>
        <p>
          <b>Email</b>
        </p>
        <p>{userData?.email}</p>
      </div>
      <div>
        <p>
          <b>Phone</b>
        </p>
        <p>{userData?.phone}</p>
      </div>
      <Button variant="contained" onClick={props.handleEdition}>
        Edit
      </Button>
    </>
  );
};

export default DispalyUserData;
