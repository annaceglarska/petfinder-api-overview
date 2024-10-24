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
import {
  countOfPetsPerPage,
  totalCountOfPets,
} from "../../slices/pets/pets.slice";
import logo from "./../../assets/images/petfinder_logo.png";
import styles from "./AdditionalCard.module.css";
import { useTranslation } from "react-i18next";
import { getOrganization } from "../../slices/organizations/organizations.slice";
import { Organization } from "../../services/api/petfinder/organizations/organizations.type";

const AdditionalCard = () => {
  const { t } = useTranslation();
  const totalPetsCount: number | undefined = useAppSelector(totalCountOfPets);
  const organization: Organization | null = useAppSelector(getOrganization);
  const countOfDisplayedPets: number | undefined =
    useAppSelector(countOfPetsPerPage);
  const isMorePetsThanInOrganizationDetails: boolean =
    totalPetsCount && countOfDisplayedPets
      ? Boolean(totalPetsCount > countOfDisplayedPets)
      : false;

  const morePetsToDisplayed: number | undefined =
    countOfDisplayedPets &&
    totalPetsCount &&
    totalPetsCount - countOfDisplayedPets;

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
