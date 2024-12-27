import {
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import styles from "./ContactForm.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { MessageFormData } from "./ContactForm.types";
import { StyledButton } from "../../styled/SendMessageButton";
import messagesApiService from "./../../services/api/backend/message/message.service";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PetContext } from "../../contexts/PetContext";

export interface ContactFormProps {
  closeModal: () => void;
  organizationEmail: string | undefined;
}

const ContactForm: React.FC<ContactFormProps> = (props) => {
  const { petData } = useContext(PetContext);
  const [hoverFormButton, setHoverFormButton] = useState<boolean>(false);
  const { t } = useTranslation();
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
      organizationEmail: props.organizationEmail,
      petId: petData?.animal.id,
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
              required: t("REQUIRED_FIELD"),
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: t("EMAIL_MESSAGE"),
              },
            })}
            aria-invalid={Boolean(errors.email)}
            color="secondary"
            variant="standard"
            label={t("YOUR_EMAIL")}
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
            {...register("name", { required: t("REQUIRED_FIELD") })}
            color="secondary"
            variant="standard"
            label={t("YOUR_NAME")}
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
              required: t("REQUIRED_FIELD"),
              pattern: {
                value: /^\+?([0-9]{2})?[0-9]{9}$/,
                message: t("WRONG_PHONE_MESSAGE"),
              },
            })}
            color="secondary"
            variant="standard"
            label={t("YOUR_PHONE")}
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
            {...register("message", { required: t("REQUIRED_FIELD") })}
            color="secondary"
            label={t("YOUR_MESSAGE")}
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
              {...register("agreement", { required: t("REQUIRED_FIELD") })}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon color="secondary" />}
              aria-invalid={Boolean(errors.agreement)}
            />
          }
          label={t("AGREEMENT_MESSAGE")}
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
          {t("SEND_MESSAGE")}
        </StyledButton>
      </div>
    </form>
  );
};

export default ContactForm;
