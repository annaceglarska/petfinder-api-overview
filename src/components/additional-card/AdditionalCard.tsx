import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { totalCountOfPets } from "../../slices/pets/pets.slice";
import logo from "./../../assets/images/petfinder_logo.png";
import styles from "./AdditionalCard.module.css";

const AdditionalCard = () => {
  const totalPetsCount = useAppSelector(totalCountOfPets);
  return (
    <Card className={styles["additional-card-element"]}>
      <CardMedia sx={{ height: 200 }} image={logo} title={"more pets"} />
      <CardContent className={styles["additional-card__content"]}>
        <Typography
          variant="body2"
          className={styles["additional-card__description"]}
        >{`${totalPetsCount} more pets available`}</Typography>
      </CardContent>
      <CardActions className={styles["additional-card__card-actions"]}>
        <Button size="large" component={Link} to={``}>
          Meet them
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdditionalCard;
