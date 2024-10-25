import {
  ReactElement,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Pagination, Pet } from "../../services/api/petfinder/pets/pets.types";
import { Organization } from "../../services/api/petfinder/organizations/organizations.type";
import { GridProps } from "@mui/material";

export type FetchDataFunction = (page: number) => void;
export type RenderFunctionProps<T> = {
  data: T;
  ref: Ref<HTMLDivElement>;
};
export type RenderFunction<
  T extends Pet[] | Organization[],
  K extends ReactElement = ReactElement
> = (props: RenderFunctionProps<T>) => K;

export interface InfiniteScrollProps<T extends Pet[] | Organization[]> {
  data: T;
  loading: boolean;
  pagination: Pagination | undefined;
  fetchData: FetchDataFunction;
  render: RenderFunction<T>;
  gridCardConfig?: GridProps;
  additionalCard?: JSX.Element;
}

export const RESET_INFINITE_SCROLL_DATA = "reset-infinite-scroll-data";

export const InfiniteScroll = <T extends Pet[] | Organization[]>(
  props: InfiniteScrollProps<T>
) => {
  const pagination = props.pagination;
  const [infiniteScrollData, setInfiniteScrollData] = useState<T>(props.data);

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
    setInfiniteScrollData([...infiniteScrollData, ...props.data] as T);
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

  const cards = useMemo(
    () =>
      props.render({
        data: infiniteScrollData,
        ref: lastPostElementRef,
      }),
    [props.render, infiniteScrollData, lastPostElementRef]
  );

  useEffect(() => {
    const handler = () => {
      resetInfiniteScroll();
    };

    window.addEventListener(RESET_INFINITE_SCROLL_DATA, handler);
    return () => {
      window.removeEventListener(RESET_INFINITE_SCROLL_DATA, handler);
    };
  }, []);

  const resetInfiniteScroll = () => {
    setInfiniteScrollData([] as unknown as T);
    setPageToGetData(null);
  };

  return <>{cards}</>;
};
