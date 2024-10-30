import { useContext, useMemo } from "react";
import styles from "./PetAttributes.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getDataForPetAttributes } from "./helpers/PetAttributes.helpers";
import { PetContext } from "../../contexts/PetContext";

export interface PetAttributesProps {}

const PetAttributes: React.FC<PetAttributesProps> = () => {
  const { petData } = useContext(PetContext);
  const attributes = useMemo(
    () => (petData?.animal ? getDataForPetAttributes(petData.animal) : []),
    [petData?.animal]
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
