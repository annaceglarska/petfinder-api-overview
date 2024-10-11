import { Pet } from "../../../services/api/petfinder/pets/pets.types";
import i18next from "./../../../config/i18next";

export interface AttributeDetails {
    label: string;
    value: boolean | null;
}

export const getDataForPetAttributes = (data: Pet): AttributeDetails[] => {
    const { attributes: { spayed_neutered, house_trained, declawed, special_needs, shots_current }, environment: { dogs, cats, children } } = data;
    return [
        {
            label: i18next.t("SPAYED_NEUTERED"),
            value: spayed_neutered
        },
        {
            label: i18next.t("HOUSE_TRAINED"),
            value: house_trained
        },
        {
            label: i18next.t("DECLAWED"),
            value: declawed
        },
        {
            label: i18next.t("SPECIAL_NEEDS"),
            value: special_needs
        },
        {
            label: i18next.t("SHOTS_CURRENT"),
            value: shots_current
        },
        {
            label: i18next.t("GOOD_WITH_DOGS"),
            value: dogs
        },
        {
            label: i18next.t("GOOD_WITH_CATS"),
            value: cats
        },
        {
            label: i18next.t("GOOD_WITH_CHILDREN"),
            value: children
        }
    ]
}