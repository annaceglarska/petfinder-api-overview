import { Button } from "@mui/material";
import hero_image from "./../../assets/images/hero_image.jpg";
import styles from "./Hero.module.css";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className={styles["hero-wrapper"]}>
      <img src={hero_image} className={styles["hero-image"]} />
      <div className={styles["hero-buttons"]}>
        <Button variant="contained">Type location...</Button>
        <Button variant="contained" component={Link} to="/dogs">
          Find a dog
        </Button>
        <Button variant="contained" component={Link} to="/cats">
          Find a cat
        </Button>
        {/* <Button onClick={}>Find a horse</Button>
        <Button onClick={}>Find a rabbit</Button>
        <Button onClick={}>Find a bird</Button>  */}
      </div>
    </div>
  );
};
