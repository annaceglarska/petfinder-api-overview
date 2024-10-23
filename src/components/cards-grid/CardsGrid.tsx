import { Grid, GridProps } from "@mui/material";
import { CardElement } from "../card-element/CardElement";
import styles from "./CardsGrid.module.css";
import { Pet } from "../../services/api/petfinder/pets/pets.types";
import React, { ReactElement, Ref, forwardRef } from "react";
import { Organization } from "../../services/api/petfinder/organizations/organizations.type";

export interface CardsGridProps<T extends Pet[] | Organization[] = Pet[]> {
  data: T;
  gridCardConfig?: GridProps;
  additionalCard?: JSX.Element;
}

export const CardsGrid = forwardRef<HTMLDivElement, CardsGridProps>(
  <T extends Pet[] | Organization[]>(
    props: CardsGridProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => (
    <>
      <Grid container spacing={2} className={styles["cards-wrapper"]}>
        {props.data.map((data: Pet | Organization, index: number) => (
          <Grid
            item
            key={data.id}
            xl={3}
            md={4}
            sm={6}
            ref={
              props.data.length === index + 1 && !props.additionalCard
                ? ref
                : null
            }
            {...props.gridCardConfig}
          >
            <CardElement data={data} />
          </Grid>
        ))}
        {props.additionalCard && (
          <Grid ref={ref} item xl={3} md={4} sm={6} {...props.gridCardConfig}>
            {props.additionalCard}
          </Grid>
        )}
      </Grid>
    </>
  )
) as <T extends Pet[] | Organization[]>(
  p: CardsGridProps<T> & { ref?: Ref<HTMLDivElement> }
) => ReactElement;
