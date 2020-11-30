import {Dispatch} from "react";
import {useCookies} from "react-cookie";

const SORTING_COLUMN = "sortingColumn";
const SORTING_DIRECTION = "sortingDirection";

export const useSorting = (): [string | undefined, string | undefined, (columnName: string, direction: string) => void, Dispatch<void>] => {
    const [cookies, setCookie, removeCookie] = useCookies([SORTING_COLUMN, SORTING_DIRECTION]);
    const setSorting = (columnName: string, direction: string) => {
        setCookie(SORTING_COLUMN, columnName);
        setCookie(SORTING_DIRECTION, direction)
    };

    const removeSorting = () => {
        removeCookie(SORTING_COLUMN);
        removeCookie(SORTING_DIRECTION)
    };

    return [cookies[SORTING_COLUMN], cookies[SORTING_DIRECTION], setSorting, removeSorting];
};
