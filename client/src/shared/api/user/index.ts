import {jwtDecode} from "jwt-decode"
import { api, errorHandler } from "../api"
import { User } from "./model"

export const getUser = async (token: string): Promise<User> => {
    try {
        const decodedToken: { userId: string } = jwtDecode(token)
        const userId = decodedToken.userId

        console.log("getUser function: fetching user data for userId", userId)
        const res = await api
            .get(`users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .json<User>()
        console.log("getUser function: fetched user data", res)
        return res
    } catch (error) {
        console.error("getUser function: error fetching user data", error)
        return await errorHandler(error)
    }
}
