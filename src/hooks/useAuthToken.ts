import {useCookies} from "react-cookie";
import {Dispatch} from "react";

const TOKEN_NAME = "authToken";

export const useAuthToken = (): [string, Dispatch<string>, Dispatch<void>] => {
    const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);
    const setAuthToken = (authToken: String) => setCookie(TOKEN_NAME, authToken);
    const removeAuthToken = () => removeCookie(TOKEN_NAME, {path: '/'});
    return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
};
