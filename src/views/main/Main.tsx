import { Organizations } from "../organizations/Organizations";
import { Pets } from "../pets/Pets";
import styles from "./Main.module.css";
import { useTranslation } from "react-i18next";

export const Main: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles["main__container"]}>
      <h1>{t("PETS")}</h1>
      <Pets />
      <h1>{t("ORGANIZATION")}</h1>
      <Organizations />
    </div>
  );
};
