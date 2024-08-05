import Button from "@mui/material/Button";
import { useAppSelector } from "../../app/hooks";
import { getOrganization } from "../../slices/organization/organization.slice";
import { useState } from "react";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import styles from "./OrganizationContactInfo.module.css";

const OrganizationContactInfo: React.FC = () => {
  const organization = useAppSelector(getOrganization);

  const [isNumberHidden, setIsNumberHidden] = useState<Boolean>(true);
  const [hover, setHover] = useState<Boolean>(false);

  const onClickHandler = () => setIsNumberHidden(false);

  return (
    <>
      {Boolean(organization?.phone) && (
        <div className={styles["organization-contact-info__container"]}>
          <p>Interested in adopting this pet?</p>
          {!isNumberHidden && (
            <p>
              <small>
                <b>Mention that you are calling from Petfinder!</b>
              </small>
            </p>
          )}
          <Button
            variant={hover ? "contained" : "outlined"}
            href={isNumberHidden ? undefined : `tel:${organization?.phone}`}
            size="large"
            onClick={onClickHandler}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <PhoneInTalkIcon />
            {isNumberHidden
              ? `${organization?.phone.substring(1, 4)} xxx xxx`
              : organization?.phone}
          </Button>
        </div>
      )}
    </>
  );
};

export default OrganizationContactInfo;
