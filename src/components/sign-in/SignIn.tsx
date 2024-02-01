import React, { useState } from "react";
import { FormData } from "./SignIn.types";
import { useAppDispatch } from "../../app/hooks";
import { loginUserAsync } from "../../slices/user/user.api-actions";

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

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
    <form onSubmit={submitHandler}>
      <label>
        Email
        <input
          required
          type="email"
          value={formData.email}
          name="email"
          onChange={changeHandler}
        />
      </label>
      <label>
        Password
        <input
          required
          type="password"
          value={formData.password}
          name="password"
          onChange={changeHandler}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
