import { RESET_INFINITE_SCROLL_DATA } from "../components/infinite-scroll/InfiniteScroll";

export const sendResetInfiniteScrollEvent = () => {
    const event = new CustomEvent(RESET_INFINITE_SCROLL_DATA);
    window.dispatchEvent(event);
};
