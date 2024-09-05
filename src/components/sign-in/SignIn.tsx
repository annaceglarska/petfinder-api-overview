import { SignInFormData } from "./SignIn.types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginUserAsync } from "../../slices/user/user.api-actions";
import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./SignIn.module.css";
import { getError, isUserSignInPending } from "../../slices/user/user.slice";
import { SubmitHandler, useForm } from "react-hook-form";

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const errorsFromBackend = useAppSelector(getError);
  const isPendingStatus = useAppSelector(isUserSignInPending);

  const onSubmit: SubmitHandler<SignInFormData> = (formData) => {
    dispatch(loginUserAsync(formData));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles["sign-panel__form"]}
    >
      <FormControl className={styles["sign-panel__control"]}>
        <TextField
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address",
            },
          })}
          aria-invalid={Boolean(errors.email)}
          label="Your email"
          className={styles["sign-panel__text-field"]}
        />
        {errors.email && (
          <Typography component={"span"} sx={{ color: "red" }}>
            {errors.email.message}
          </Typography>
        )}
      </FormControl>
      <FormControl className={styles["sign-panel__control"]}>
        <TextField
          {...register("password", {
            required: "This field is required",
          })}
          label="password"
          aria-invalid={Boolean(errors.password)}
          className={styles["sign-panel__text-field"]}
        />
        {errors.password && (
          <Typography component={"span"} sx={{ color: "red" }}>
            {errors.password.message}
          </Typography>
        )}
      </FormControl>
      {Boolean(errorsFromBackend) && (
        <p className={styles["sign-panel__error"]}>
          Incorrect login or password.
        </p>
      )}

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
