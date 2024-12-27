import Button from "@mui/material/Button";
import { useState } from "react";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import styles from "./OrganizationContactInfo.module.css";
import EmailIcon from "@mui/icons-material/Email";
import { IconButton, Modal, Typography } from "@mui/material";
import { StyledBox } from "../../styled/StyledBox";
import ContactForm from "../contact-form/ContactForm";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { Organization } from "../../services/api/petfinder/organizations/organizations.type";

export interface OrganizationContactInfoProps {
  context: "organization" | "pet";
  data: Organization | undefined;
}

const OrganizationContactInfo: React.FC<OrganizationContactInfoProps> = (
  props
) => {
  const { phone, email } = props.data || {};

  const [isNumberHidden, setIsNumberHidden] = useState<Boolean>(true);
  const [hoverPhoneButton, setHoverPhoneButton] = useState<Boolean>(false);
  const [hoverEmailButton, setHoverEmailButton] = useState<Boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { t } = useTranslation();

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
      {(Boolean(email) || Boolean(phone)) && props.context === "pet" && (
        <div className={styles["organization-contact-info__container"]}>
          <p>{t("INTERESTED_IN_ADOPTING")}</p>
        </div>
      )}

      {Boolean(phone) && (
        <div className={styles["organization-contact-info__container"]}>
          {!isNumberHidden && (
            <p>
              <small>
                <b>{t("CALLING_FROM_PETFINDER")}</b>
              </small>
            </p>
          )}
          <Button
            variant={hoverPhoneButton ? "contained" : "outlined"}
            href={isNumberHidden ? undefined : `tel:${phone}`}
            size="large"
            onClick={onClickPhoneButtonHandler}
            onMouseEnter={() => setHoverPhoneButton(true)}
            onMouseLeave={() => setHoverPhoneButton(false)}
          >
            <PhoneInTalkIcon />
            {isNumberHidden ? `${phone?.substring(1, 4)} xxx xxx` : phone}
          </Button>
        </div>
      )}
      <div className={styles["organization-contact-info__container"]}>
        {Boolean(email) && (
          <Button
            variant={hoverEmailButton ? "contained" : "outlined"}
            size="large"
            color="secondary"
            onMouseEnter={() => setHoverEmailButton(true)}
            onMouseLeave={() => setHoverEmailButton(false)}
            onClick={handleModalOpen}
          >
            <EmailIcon />
            {t("ASK_ABOUT_PET")}
          </Button>
        )}
      </div>

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
            {t("ASK_ABOUT_PET")}
          </Typography>
          <ContactForm
            closeModal={closeModal}
            organizationEmail={props.data?.email}
          />
        </StyledBox>
      </Modal>
    </>
  );
};

export default OrganizationContactInfo;
