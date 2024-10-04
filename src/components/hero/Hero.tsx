import { Button } from "@mui/material";
import hero_image from "./../../assets/images/hero_image.jpg";
import styles from "./Hero.module.css";
import { Link, useLocation } from "react-router-dom";

export const Hero: React.FC = () => {
  const locationPath = useLocation();

  return (
    <div className={styles["hero-wrapper"]}>
      <img src={hero_image} alt="Hero" className={styles["hero-image"]} />
      {locationPath.pathname.includes("/pets") ? (
        <div className={styles["hero-buttons"]}>
          <Button variant="contained" component={Link} to="/pets/dogs">
            Find a dog
          </Button>
          <Button variant="contained" component={Link} to="/pets/cats">
            Find a cat
          </Button>
          <Button variant="contained" component={Link} to="/pets/rabbits">
            Find a rabbit
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/pets/small-and-furies"
          >
            Find small and furry
          </Button>
          <Button variant="contained" component={Link} to="/pets/horses">
            Find a horse
          </Button>
          <Button variant="contained" component={Link} to="/pets/birds">
            Find a bird
          </Button>
          <Button variant="contained" component={Link} to="/pets/barnyards">
            Find a barnyard
          </Button>
          <Button variant="contained" component={Link} to="/pets/others">
            Find other
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
