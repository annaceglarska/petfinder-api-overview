import React, { useState } from "react";
import { FormData } from "./SignIn.types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginUserAsync } from "../../slices/user/user.api-actions";
import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";
import styles from "./SignIn.module.css";
import { getError, isUserSignInPending } from "../../slices/user/user.slice";

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const errors = useAppSelector(getError);
  const isPendingStatus = useAppSelector(isUserSignInPending);

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(loginUserAsync(formData));
  };

  return (
    <form onSubmit={submitHandler} className={styles["sign-panel__form"]}>
      <FormControl className={styles["sign-panel__control"]}>
        <TextField
          label="email"
          onChange={changeHandler}
          name="email"
          required
          type="email"
          value={formData.email}
          className={styles["sign-panel__text-field"]}
        />
      </FormControl>
      <FormControl className={styles["sign-panel__control"]}>
        <TextField
          label="password"
          onChange={changeHandler}
          name="password"
          required
          type="password"
          value={formData.password}
          className={styles["sign-panel__text-field"]}
        />
      </FormControl>
      {Boolean(errors) && <p>Incorrect login or password.</p>}

      <Button
        variant="contained"
        size="medium"
        type="submit"
        disabled={isPendingStatus}
      >
        {isPendingStatus ? (
          <CircularProgress style={{ width: "30px" }} />
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
};
