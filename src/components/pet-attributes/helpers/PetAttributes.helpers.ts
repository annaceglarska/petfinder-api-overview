import { Pet } from "../../../services/api/petfinder/pets/pets.types";

export interface AttributeDetails {
    label: string;
    value: boolean | null;
}

export const getDataForPetAttributes = (data: Pet): AttributeDetails[] => {
    const { attributes: { spayed_neutered, house_trained, declawed, special_needs, shots_current }, environment: { dogs, cats, children } } = data;
    return [
        {
            label: "Spayed neutered",
            value: spayed_neutered
        },
        {
            label: "House trained",
            value: house_trained
        },
        {
            label: "Declawed",
            value: declawed
        },
        {
            label: "Special need",
            value: special_needs
        },
        {
            label: "Shots current",
            value: shots_current
        },
        {
            label: "Dog friendly",
            value: dogs
        },
        {
            label: "Cat friendly",
            value: cats
        },
        {
            label: "Children friendly",
            value: children
        }
    ]
}