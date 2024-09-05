import { Button, FormControl, TextField, Typography } from "@mui/material";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { EditUserFormData } from "./EditUserData.types";

export interface EditUserDataProps {
  handleEdition: () => void;
}

const EditUserData: React.FC<EditUserDataProps> = (props) => {
  const dispatch = useAppDispatch();

  const isReady = useAppSelector(isUserEditionReady);
  const userData = useAppSelector(getUser);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditUserFormData>({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (isReady) {
      dispatch(clearUserEditionStatus());
      props.handleEdition();
    }
  }, [isReady]);

  useEffect(() => {
    const { name, surname, email, phone } = userData || {};
    const formData = { name, surname, email, phone } as UserData;
    Object.entries(formData).forEach(([key, value]) => {
      setValue(key as keyof UserData, value);
    });
  }, [userData]);

  const onSubmit: SubmitHandler<EditUserFormData> = (formData) => {
    dispatch(editUserDataAsync(formData));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["edit-panel__form"]}
      >
        <FormControl sx={{ m: 1, width: 300 }}>
          <TextField
            {...register("name", {
              required: "This field is required",
            })}
            label="name"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && (
            <Typography component={"span"} sx={{ color: "red" }}>
              {errors.name.message}
            </Typography>
          )}
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <TextField
            {...register("surname", {
              required: "This field is required",
            })}
            label="surname"
            aria-invalid={Boolean(errors.surname)}
          />
          {errors.surname && (
            <Typography component={"span"} sx={{ color: "red" }}>
              {errors.surname.message}
            </Typography>
          )}
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <TextField
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address",
              },
            })}
            label="email"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <Typography component={"span"} sx={{ color: "red" }}>
              {errors.email.message}
            </Typography>
          )}
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <TextField
            {...register("phone", {
              required: "This field is required",
              pattern: {
                value: /^\+?([0-9]{2})?[0-9]{9}$/,
                message: "Please enter a valid phone number",
              },
            })}
            label="phone"
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && (
            <Typography component={"span"} sx={{ color: "red" }}>
              {errors.phone.message}
            </Typography>
          )}
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
