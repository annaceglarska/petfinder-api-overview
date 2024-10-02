import {
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./ContactForm.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useAppSelector } from "../../app/hooks";
import { getPet } from "../../slices/pets/pets.slice";
import { getOrganization } from "../../slices/organization/organization.slice";
import { MessageFormData } from "./ContactForm.types";
import { StyledButton } from "../../styled/SendMessageButton";
import messagesApiService from "./../../services/api/backend/message/message.service";
import { SubmitHandler, useForm } from "react-hook-form";

export interface ContactFormProps {
  closeModal: () => void;
}

const ContactForm: React.FC<ContactFormProps> = (props) => {
  const pet = useAppSelector(getPet);
  const organization = useAppSelector(getOrganization);
  const [hoverFormButton, setHoverFormButton] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MessageFormData>({
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      message: "",
      agreement: false,
    },
  });

  const onSubmit: SubmitHandler<MessageFormData> = async (formData) => {
    const dataToSend = {
      ...formData,
      organizationEmail: organization?.email,
      petId: pet?.id,
    };
    try {
      await messagesApiService.sendMessage(dataToSend);
      props.closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["contact-form__fields"]}>
        <FormControl>
          <TextField
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address",
              },
            })}
            aria-invalid={Boolean(errors.email)}
            color="secondary"
            variant="standard"
            label="Your email"
            className={styles["contact-form__fields"]}
          />
          {errors.email && (
            <Typography component={"span"} sx={{ color: "red" }}>
              {errors.email.message}
            </Typography>
          )}
        </FormControl>

        <FormControl>
          <TextField
            {...register("name", { required: "This field is required" })}
            color="secondary"
            variant="standard"
            label="Your name"
            type="text"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && (
            <Typography component={"span"} sx={{ color: "red" }}>
              {errors.name.message}
            </Typography>
          )}
        </FormControl>
        <FormControl>
          <TextField
            {...register("phone", {
              required: true,
              pattern: {
                value: /^\+?([0-9]{2})?[0-9]{9}$/,
                message: "Please enter a valid phone number",
              },
            })}
            color="secondary"
            variant="standard"
            label="Your phone number"
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && (
            <Typography component={"span"} sx={{ color: "red" }}>
              {errors.phone.message}
            </Typography>
          )}
        </FormControl>
        <FormControl>
          <TextField
            {...register("message", { required: "This field is required" })}
            color="secondary"
            label="Enter your message"
            type="text"
            rows={6}
            multiline={true}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message && (
            <Typography component={"span"} sx={{ color: "red" }}>
              {errors.message.message}
            </Typography>
          )}
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              {...register("agreement", { required: "This field is required" })}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon color="secondary" />}
              aria-invalid={Boolean(errors.agreement)}
            />
          }
          label="I declare that I have read the Privacy Policy"
        />
        {errors.agreement && (
          <Typography component={"span"} sx={{ color: "red" }}>
            {errors.agreement.message}
          </Typography>
        )}

        <StyledButton
          borderRadius="20px"
          type="submit"
          color="secondary"
          size="large"
          variant={hoverFormButton ? "contained" : "outlined"}
          onMouseEnter={() => setHoverFormButton(true)}
          onMouseLeave={() => setHoverFormButton(false)}
        >
          Send message
        </StyledButton>
      </div>
    </form>
  );
};

export default ContactForm;
