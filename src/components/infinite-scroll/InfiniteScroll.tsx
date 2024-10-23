import { useCallback, useEffect, useRef, useState } from "react";
import { CardsGrid } from "../cards-grid/CardsGrid";
import { Pagination, Pet } from "../../services/api/petfinder/pets/pets.types";
import { Organization } from "../../services/api/petfinder/organizations/organizations.type";
import { GridProps } from "@mui/material";

export type FetchDataFunction = (page: number) => void;

export interface InfiniteScrollProps {
  data: Pet[] | Organization[];
  loading: boolean;
  pagination: Pagination | undefined;
  fetchData: FetchDataFunction;
  gridCardConfig?: GridProps;
  additionalCard?: JSX.Element;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = (props) => {
  const pagination = props.pagination;
  const [infiniteScrollData, setInfiniteScrollData] = useState<
    Pet[] | Organization[]
  >(props.data);

  const hasMorePage: boolean = pagination
    ? pagination.current_page < pagination.total_pages
    : false;

  const [pageToGetData, setPageToGetData] = useState<number | null>(null);

  useEffect(() => {
    if (pageToGetData) {
      props.fetchData(pageToGetData);
    }
  }, [pageToGetData]);

  useEffect(() => {
    setInfiniteScrollData([...infiniteScrollData, ...props.data] as
      | Pet[]
      | Organization[]);
  }, [props.data]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (props.loading || !hasMorePage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && pagination) {
          setPageToGetData(pagination?.current_page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [props.loading, hasMorePage, pagination]
  );

  return (
    <>
      <CardsGrid
        data={infiniteScrollData}
        gridCardConfig={props.gridCardConfig}
        additionalCard={props.additionalCard}
        ref={lastPostElementRef}
      />
      {props.loading && <p>Loading</p>}
    </>
  );
};
