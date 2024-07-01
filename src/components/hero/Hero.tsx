import { Button } from "@mui/material";
import hero_image from "./../../assets/images/hero_image.jpg";
import styles from "./Hero.module.css";
import { Link } from "react-router-dom";

export const Hero: React.FC = () => {
  return (
    <div className={styles["hero-wrapper"]}>
      <img src={hero_image} className={styles["hero-image"]} />
      <div className={styles["hero-buttons"]}>
        <Button variant="contained" component={Link} to="/dogs">
          Find a dog
        </Button>
        <Button variant="contained" component={Link} to="/cats">
          Find a cat
        </Button>
        <Button variant="contained" component={Link} to="/rabbits">
          Find a rabbit
        </Button>
        <Button variant="contained" component={Link} to="/small-and-furies">
          Find small and furry
        </Button>
        <Button variant="contained" component={Link} to="/horses">
          Find a horse
        </Button>
        <Button variant="contained" component={Link} to="/birds">
          Find a bird
        </Button>
        <Button variant="contained" component={Link} to="/barnyards">
          Find a barnyard
        </Button>
        <Button variant="contained" component={Link} to="/others">
          Find other
        </Button>
      </div>
    </div>
  );
};
