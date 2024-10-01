import { jwtDecode } from "jwt-decode"
import { UTCDate } from "@date-fns/utc";

export interface DecodedToken {
    exp?: number;
}

const tokenServiceDef = () => {

    const TOKEN_KEY_NAME = "userToken";

    const saveToken = (token: string): void => {
        localStorage.setItem(TOKEN_KEY_NAME, token)
    }

    const getToken = (): string | null => localStorage.getItem(TOKEN_KEY_NAME)


    const deleteToken = (): void => {
        localStorage.removeItem(TOKEN_KEY_NAME)
    }

    const validateToken = (token: string | undefined): boolean => {
        if (!token) {
            return false
        }
        const decoded: DecodedToken = jwtDecode(token);
        // const currentDate = new Date()
        // const tokenDate = decoded.exp ? new UTCDate(decoded.exp * 1000) : new Date()
        // return currentDate > tokenDate
        return true;
    }

    return {
        saveToken,
        getToken,
        deleteToken,
        validateToken
    }
}

const TokenService = tokenServiceDef();
export default TokenService