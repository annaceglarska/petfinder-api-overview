import { Container } from "@mui/material";
import styles from "./OrganizationDetailsContainer.module.css";
import { useAppSelector } from "../../app/hooks";
import { getOrganization } from "../../slices/organizations/organizations.slice";
import PhotosCarousel from "../photos-carousel/PhotosCarousel";
import OrganizationDetails from "../organization-details/OrganizationDetails";
import { CardsGrid } from "../cards-grid/CardsGrid";
import AdditionalCard from "../additional-card/AdditionalCard";
import { useTranslation } from "react-i18next";
import { PetsDTO } from "../../services/api/petfinder/pets/pets.types";

export interface OrganizationDetailsContainerProps {
  data: PetsDTO;
}

const OrganizationDetailsContainer: React.FC<
  OrganizationDetailsContainerProps
> = ({ data }) => {
  const organization = useAppSelector(getOrganization);
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg">
      <div className={styles["organization-details__container"]}>
        <div>
          <div>
            {!!organization?.photos.length && (
              <PhotosCarousel photos={organization.photos} />
            )}
          </div>

          {!!organization?.mission_statement && (
            <div>
              <h1>{t("OUR_MISSION")}</h1>
              <p>{organization.mission_statement}</p>
            </div>
          )}
          {!!data.animals.length && (
            <>
              <h1>{t("OUR_PETS")}</h1>
              <CardsGrid
                data={data.animals}
                gridCardConfig={{ xl: 4, md: 6, sm: 12 }}
                additionalCard={<AdditionalCard pagination={data.pagination} />}
              />
            </>
          )}
        </div>

        <div>
          <OrganizationDetails />
        </div>
      </div>
    </Container>
  );
};

export default OrganizationDetailsContainer;
