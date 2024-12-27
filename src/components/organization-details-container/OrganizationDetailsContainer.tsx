import { Container } from "@mui/material";
import styles from "./OrganizationDetailsContainer.module.css";
import PhotosCarousel from "../photos-carousel/PhotosCarousel";
import OrganizationDetails from "../organization-details/OrganizationDetails";
import { CardsGrid } from "../cards-grid/CardsGrid";
import AdditionalCard from "../additional-card/AdditionalCard";
import { useTranslation } from "react-i18next";
import { PetsDTO } from "../../services/api/petfinder/pets/pets.types";
import { useGetOrganizationByIdQueryState } from "../../slices/organizations/organization.api";
import { useParams } from "react-router-dom";

export interface OrganizationDetailsContainerProps {
  data: PetsDTO;
}

const OrganizationDetailsContainer: React.FC<
  OrganizationDetailsContainerProps
> = ({ data }) => {
  const params = useParams();
  const { data: organization } = useGetOrganizationByIdQueryState(params.id!);
  const { t } = useTranslation();

  const { photos, mission_statement } = organization?.organization || {};

  return (
    <Container maxWidth="lg">
      <div className={styles["organization-details__container"]}>
        <div>
          <div>{!!photos?.length && <PhotosCarousel photos={photos} />}</div>

          {!!mission_statement && (
            <div>
              <h1>{t("OUR_MISSION")}</h1>
              <p>{mission_statement}</p>
            </div>
          )}
          {!!data.animals.length && (
            <>
              <h1>{t("OUR_PETS")}</h1>
              <CardsGrid
                data={data.animals}
                gridCardConfig={{ xl: 4, md: 6, sm: 12 }}
                additionalCard={
                  <AdditionalCard
                    pagination={data.pagination}
                    organizationId={organization?.organization.id || ""}
                  />
                }
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
