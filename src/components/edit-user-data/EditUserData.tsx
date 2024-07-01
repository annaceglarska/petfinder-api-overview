import { Button, FormControl, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  clearUserEditionStatus,
  getUser,
  isUserEditionReady,
} from "../../slices/user/user.slice";
import { useEffect, useState } from "react";
import styles from "./EditUserData.module.css";
import { editUserDataAsync } from "../../slices/user/user.api-actions";
import { UserData } from "../../services/api/backend/auth/auth.types";

export interface EditUserDataProps {
  handleEdition: () => void;
}

const EditUserData: React.FC<EditUserDataProps> = (props) => {
  const dispatch = useAppDispatch();

  const isReady = useAppSelector(isUserEditionReady);
  const userData = useAppSelector(getUser);

  const [formData, setFormData] = useState<UserData>({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (isReady) {
      dispatch(clearUserEditionStatus());
      props.handleEdition();
    }
  }, [isReady]);

  useEffect(() => {
    const { name, surname, email, phone } = userData || {};
    setFormData({ name, surname, email, phone } as UserData);
  }, [userData]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(editUserDataAsync(formData));
  };

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles["edit-panel__form"]}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <TextField
            label="name"
            onChange={changeHandler}
            name="name"
            required
            value={formData.name}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <TextField
            label="surname"
            onChange={changeHandler}
            name="surname"
            required
            value={formData.surname}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <TextField
            label="email"
            onChange={changeHandler}
            name="email"
            type="email"
            required
            value={formData.email}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <TextField
            label="phone"
            onChange={changeHandler}
            name="phone"
            value={formData.phone}
          />
        </FormControl>
        <Button
          variant="contained"
          size="medium"
          type="submit"
          className={styles["form__button--submit"]}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default EditUserData;
