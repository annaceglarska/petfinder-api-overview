import { AnimalType } from "../../services/api/petfinder/pets/pets.types";

export const isValidAnimalType = (type: string): boolean => {
  return animalMap.has(type);
};

export const animalMap = new Map<string, AnimalType>([
  ["dogs", "dog"],
  ["cats", "cat"],
  ["rabbits", "rabbit"],
  ["small-and-furies", "small & furry"],
  ["horses", "horse"],
  ["birds", "bird"],
  ["others", "scales, fins & other"],
  ["barnyards", "barnyard"],
]);

export const getAnimalType = (type: string): AnimalType | undefined => {
  return animalMap.get(type);
};
