import { useMemo } from "react";
import styles from "./PetAttributes.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getDataForPetAttributes } from "./helpers/PetAttributes.helpers";
import { useAppSelector } from "../../app/hooks";
import { getPet } from "../../slices/pets/pets.slice";

export interface PetAttributesProps {}

const PetAttributes: React.FC<PetAttributesProps> = () => {
  const pet = useAppSelector(getPet);
  const attributes = useMemo(
    () => (pet ? getDataForPetAttributes(pet) : []),
    [pet]
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
