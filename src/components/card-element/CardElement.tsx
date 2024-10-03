import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Pet } from "../../services/api/petfinder/pets/pets.types";
import { Organization } from "../../services/api/petfinder/organization/organization.type";
import { getPlaceholderByAnimalType } from "./CardElement.helpers";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import styles from "./CardElement.module.css";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { isUserLogged } from "../../slices/user/user.slice";

export interface CardElementProps {
  data: Pet | Organization;
}

export const CardElement: React.FC<CardElementProps> = (props) => {
  const isLogged = useAppSelector(isUserLogged);
  const getPlaceholderPicture = (): string => {
    if ("type" in props.data) {
      return getPlaceholderByAnimalType(props.data.type);
    } else {
      return "";
    }
  };

  return (
    <Card className={styles["card-element"]}>
      {isLogged ? (
        <IconButton
          aria-label="star-icon"
          className={styles["card__icon-button"]}
        >
          <StarBorderIcon />
        </IconButton>
      ) : (
        <></>
      )}
      <CardMedia
        sx={{ height: 250 }}
        image={props.data.photos[0]?.medium || getPlaceholderPicture()}
        title={props.data.name}
      />
      <CardContent className={styles["card__content"]}>
        <Typography gutterBottom variant="h5" component="div">
          {props.data.name}
        </Typography>
        <Typography variant="body2" className={styles["card__description"]}>
          {(props.data as any).description}
        </Typography>
      </CardContent>
      <CardActions className={styles["card__card-actions"]}>
        <Button
          size="small"
          component={Link}
          to={`/pet/details/${props.data.id}`}
        >
          Go to details
        </Button>
      </CardActions>
    </Card>
  );
};
