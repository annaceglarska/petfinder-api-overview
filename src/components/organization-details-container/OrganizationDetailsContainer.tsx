import { Container } from "@mui/material";
import styles from "./OrganizationDetailsContainer.module.css";
import { useAppSelector } from "../../app/hooks";
import { getOrganization } from "../../slices/organizations/organizations.slice";
import PhotosCarousel from "../photos-carousel/PhotosCarousel";
import OrganizationDetails from "../organization-details/OrganizationDetails";

const OrganizationDetailsContainer = () => {
  const organization = useAppSelector(getOrganization);
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
              <h1>Our Mission</h1>
              <p>{organization.mission_statement}</p>
            </div>
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
