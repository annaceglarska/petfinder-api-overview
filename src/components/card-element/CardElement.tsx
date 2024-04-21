import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Pet } from "../../services/api/pets/pets.types";
import { Organization } from "../../services/api/organization/organization.type";

export interface CardElementProps {
  data: Pet | Organization;
}

export const CardElement: React.FC<CardElementProps> = (props) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.data.photos[0]?.small}
        title={props.data.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
