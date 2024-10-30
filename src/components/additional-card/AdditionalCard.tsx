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
import logo from "./../../assets/images/petfinder_logo.png";
import styles from "./AdditionalCard.module.css";
import { useTranslation } from "react-i18next";
import { getOrganization } from "../../slices/organizations/organizations.slice";
import { Organization } from "../../services/api/petfinder/organizations/organizations.type";
import { Pagination } from "../../services/api/petfinder/pets/pets.types";

export interface AdditionalCardProps {
  pagination: Pagination;
}

const AdditionalCard: React.FC<AdditionalCardProps> = ({ pagination }) => {
  const { t } = useTranslation();
  const organization: Organization | null = useAppSelector(getOrganization);

  const isMorePetsThanInOrganizationDetails: boolean =
    pagination.total_count > pagination.count_per_page || false;

  const morePetsToDisplayed =
    pagination.total_count - pagination.count_per_page;

  return (
    <Card className={styles["additional-card-element"]}>
      <CardMedia sx={{ height: 200 }} image={logo} title={"more pets"} />
      <CardContent className={styles["additional-card__content"]}>
        <Typography
          variant="body2"
          className={styles["additional-card__description"]}
        >
          {isMorePetsThanInOrganizationDetails
            ? `${morePetsToDisplayed} more pets available`
            : ""}
        </Typography>
      </CardContent>
      <CardActions className={styles["additional-card__card-actions"]}>
        <Button
          size="large"
          component={Link}
          to={`/organization/details/${organization?.id}/pets`}
        >
          {isMorePetsThanInOrganizationDetails
            ? t("GO_TO_OTHER_PETS")
            : t("SEE_THEM")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdditionalCard;
