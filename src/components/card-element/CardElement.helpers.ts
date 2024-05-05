import dog_placeholder from "../../assets/images/dog_placeholder.jpg";
import cat_placeholder from "../../assets/images/cat_placeholder.jpg";
import rabbit_placeholder from "../../assets/images/rabbit_placeholder.jpg";
import small_furry_placeholder from "../../assets/images/small_furry_placeholder.jpg";
import horse_placeholder from "../../assets/images/horse_placeholder.jpg";
import bird_placeholder from "../../assets/images/bird_placeholder.jpg";
import scales_fins_other_placeholder from "../../assets/images/scales_fins_others.jpg";
import barnyard_placeholder from "../../assets/images/barnyard_placeholder.jpg";
import default_placeholder from "../../assets/images/default_placeholder.jpg";

export const getPlaceholderByAnimalType = (type: string): string => {
  switch (type) {
    case "Dog":
      return dog_placeholder;
    case "Cat":
      return cat_placeholder;
    case "Rabbit":
      return rabbit_placeholder;
    case "Small & Furry":
      return small_furry_placeholder;
    case "Horse":
      return horse_placeholder;
    case "Bird":
      return bird_placeholder;
    case "Scales, Fins & Other":
      return scales_fins_other_placeholder;
    case "Barnyard":
      return barnyard_placeholder;
    default:
      return default_placeholder;
  }
};
