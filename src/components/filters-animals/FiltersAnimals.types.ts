import { AnimalType } from "../../services/api/petfinder/pets/pets.types";

export interface AnimalFilterFormData {
    type: AnimalType | undefined;
    gender: string | undefined;
    size: string | undefined;
    age: string | undefined;
    coat: string | undefined;
    status: string | undefined;
    color: string | undefined;
    good_with_children: boolean | undefined;
    good_with_dogs: boolean | undefined;
    good_with_cats: boolean | undefined;
    house_trained: boolean | undefined;
    declawed: boolean | undefined;
    special_needs: boolean | undefined;
    organization: string | undefined;
    localization: string | undefined;
}
