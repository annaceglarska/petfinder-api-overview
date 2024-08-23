import {
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
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

export interface ContactFormProps {
  closeModal: () => void;
}

const ContactForm: React.FC<ContactFormProps> = (props) => {
  const pet = useAppSelector(getPet);
  const organization = useAppSelector(getOrganization);
  const [hoverFormButton, setHoverFormButton] = useState<boolean>(false);

  const [formData, setFormData] = useState<MessageFormData>({
    email: "",
    name: "",
    phone: "",
    message: "",
    agreement: false,
  });

  const changeTextFieldHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const {
      target: { name },
    } = event;
    setFormData({
      ...formData,
      [name]: checked || undefined,
    });
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
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
    <form onSubmit={submitHandler}>
      <div className={styles["contact-form__fields"]}>
        <FormControl>
          <TextField
            color="secondary"
            variant="standard"
            label="Your email"
            name="email"
            required
            type="email"
            onChange={changeTextFieldHandler}
            value={formData.email}
          />
        </FormControl>
        <FormControl>
          <TextField
            color="secondary"
            variant="standard"
            label="Your name"
            name="name"
            required
            type="text"
            onChange={changeTextFieldHandler}
            value={formData.name}
          />
        </FormControl>
        <FormControl>
          <TextField
            color="secondary"
            variant="standard"
            label="Your phone number"
            name="phone"
            required
            type="tel"
            onChange={changeTextFieldHandler}
            value={formData.phone}
          />
        </FormControl>
        <FormControl>
          <TextField
            color="secondary"
            label="Enter your message"
            name="message"
            required
            type="text"
            rows={6}
            multiline={true}
            onChange={changeTextFieldHandler}
            value={formData.message}
          />
        </FormControl>

        <FormControlLabel
          required
          control={
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checked={formData.agreement}
              checkedIcon={<CheckCircleIcon color="secondary" />}
              onChange={handleCheckboxChange}
              name="agreement"
            />
          }
          label="I declare that I have read the Privacy Policy"
        />

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
