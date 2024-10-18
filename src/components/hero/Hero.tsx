import { Button } from "@mui/material";
import hero_image from "./../../assets/images/hero_image.jpg";
import styles from "./Hero.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles["hero-wrapper"]}>
      <img src={hero_image} alt="Hero" className={styles["hero-image"]} />

      <div className={styles["hero-buttons"]}>
        <Button variant="contained" component={Link} to="/pets/dogs">
          {t("FIND_DOG")}
        </Button>
        <Button variant="contained" component={Link} to="/pets/cats">
          {t("FIND_CAT")}
        </Button>
        <Button variant="contained" component={Link} to="/pets/rabbits">
          {t("FIND_RABBIT")}
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/pets/small-and-furies"
        >
          {t("FIND_SMALL_FURRY")}
        </Button>
        <Button variant="contained" component={Link} to="/pets/horses">
          {t("FIND_HORSE")}
        </Button>
        <Button variant="contained" component={Link} to="/pets/birds">
          {t("FIND_BIRD")}
        </Button>
        <Button variant="contained" component={Link} to="/pets/barnyards">
          {t("FIND_BARNYARD")}
        </Button>
        <Button variant="contained" component={Link} to="/pets/others">
          {t("FIND_OTHER")}
        </Button>
      </div>
    </div>
  );
};
