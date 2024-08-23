import Button from "@mui/material/Button";
import { useAppSelector } from "../../app/hooks";
import { getOrganization } from "../../slices/organization/organization.slice";
import { useState } from "react";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import styles from "./OrganizationContactInfo.module.css";
import EmailIcon from "@mui/icons-material/Email";
import { IconButton, Modal, Typography } from "@mui/material";
import { StyledBox } from "../../styled/StyledBox";
import ContactForm from "../contact-form/ContactForm";
import CloseIcon from "@mui/icons-material/Close";

const OrganizationContactInfo: React.FC = () => {
  const organization = useAppSelector(getOrganization);

  const [isNumberHidden, setIsNumberHidden] = useState<Boolean>(true);
  const [hoverPhoneButton, setHoverPhoneButton] = useState<Boolean>(false);
  const [hoverEmailButton, setHoverEmailButton] = useState<Boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onClickPhoneButtonHandler = () => setIsNumberHidden(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason !== "backdropClick") {
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {Boolean(organization?.email) && Boolean(organization?.phone) && (
        <div className={styles["organization-contact-info__container"]}>
          <p>Interested in adopting this pet?</p>
        </div>
      )}

      {Boolean(organization?.phone) && (
        <div className={styles["organization-contact-info__container"]}>
          {!isNumberHidden && (
            <p>
              <small>
                <b>Mention that you are calling from Petfinder!</b>
              </small>
            </p>
          )}
          <div className={styles["organization-contact-info__container"]}>
            <Button
              variant={hoverPhoneButton ? "contained" : "outlined"}
              href={isNumberHidden ? undefined : `tel:${organization?.phone}`}
              size="large"
              onClick={onClickPhoneButtonHandler}
              onMouseEnter={() => setHoverPhoneButton(true)}
              onMouseLeave={() => setHoverPhoneButton(false)}
            >
              <PhoneInTalkIcon />
              {isNumberHidden
                ? `${organization?.phone.substring(1, 4)} xxx xxx`
                : organization?.phone}
            </Button>
            {Boolean(organization?.email) && (
              <Button
                variant={hoverEmailButton ? "contained" : "outlined"}
                size="large"
                color="secondary"
                onMouseEnter={() => setHoverEmailButton(true)}
                onMouseLeave={() => setHoverEmailButton(false)}
                onClick={handleModalOpen}
              >
                <EmailIcon />
                Ask about the pet
              </Button>
            )}
          </div>
        </div>
      )}
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox>
          <IconButton
            sx={{ float: "right" }}
            aria-label="close"
            onClick={() => setIsModalOpen(false)}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ color: (props) => props.palette.secondary.main }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Ask about pet
          </Typography>
          <ContactForm closeModal={closeModal} />
        </StyledBox>
      </Modal>
    </>
  );
};

export default OrganizationContactInfo;
