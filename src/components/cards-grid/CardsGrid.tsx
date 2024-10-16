import { Grid, GridProps } from "@mui/material";
import { CardElement } from "../card-element/CardElement";
import styles from "./CardsGrid.module.css";
import { Pet } from "../../services/api/petfinder/pets/pets.types";
import React from "react";
import { Organization } from "../../services/api/petfinder/organizations/organizations.type";

export interface CardsGridProps {
  data: Pet[] | Organization[];
  gridCardConfig?: GridProps;
  additionalCard?: JSX.Element;
}

export const CardsGrid: React.FC<CardsGridProps> = (props) => {
  return (
    <>
      <Grid container spacing={2} className={styles["cards-wrapper"]}>
        {props.data.map((data: Pet | Organization) => (
          <Grid
            item
            key={data.id}
            xl={3}
            md={4}
            sm={6}
            {...props.gridCardConfig}
          >
            <CardElement data={data} />
          </Grid>
        ))}
        {props.additionalCard && (
          <Grid item xl={3} md={4} sm={6} {...props.gridCardConfig}>
            {props.additionalCard}
          </Grid>
        )}
      </Grid>
    </>
  );
};
