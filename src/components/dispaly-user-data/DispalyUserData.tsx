import { Button } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { getUser } from "../../slices/user/user.slice";
import styles from "./DispalyUserData.module.css";
import { useTranslation } from "react-i18next";

export interface DisplayUserDataProps {
  handleEdition: () => void;
}

const DisplayUserData: React.FC<DisplayUserDataProps> = (props) => {
  const userData = useAppSelector(getUser);
  const { t } = useTranslation();
  return (
    <>
      <div>
        <p>
          <b>{t("YOUR_NAME")}</b>
        </p>
        <p>{userData?.name}</p>
      </div>
      <div>
        <p>
          <b>{t("YOUR_SURNAME")}</b>
        </p>
        <p>{userData?.surname}</p>
      </div>
      <div>
        <p>
          <b>{t("YOUR_EMAIL")}</b>
        </p>
        <p>{userData?.email}</p>
      </div>
      <div>
        <p>
          <b>{t("YOUR_PHONE")}</b>
        </p>
        <p>{userData?.phone}</p>
      </div>
      <Button
        variant="contained"
        onClick={props.handleEdition}
        className={styles["user-data-container__button"]}
      >
        {t("EDIT")}
      </Button>
    </>
  );
};

export default DisplayUserData;
