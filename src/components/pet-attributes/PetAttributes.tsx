import { useMemo } from "react";
import { Pet } from "../../services/api/petfinder/pets/pets.types";
import styles from "./PetAttributes.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getDataForPetAttributes } from "./helpers/PetAttributes.helpers";

export interface PetAttributesProps {
  data: Pet | undefined;
}

const PetAttributes: React.FC<PetAttributesProps> = ({ data }) => {
  const attributes = useMemo(
    () => (data ? getDataForPetAttributes(data) : []),
    [data]
  );
  return (
    <>
      <ul className={styles["pet-attributes__list"]}>
        {attributes.map(
          (attribute) =>
            typeof attribute.value === "boolean" && (
              <li key={attribute.label}>
                <CheckCircleIcon
                  color={attribute.value ? "primary" : "disabled"}
                />

                <span>{attribute.label}</span>
              </li>
            )
        )}
      </ul>
    </>
  );
};

export default PetAttributes;
