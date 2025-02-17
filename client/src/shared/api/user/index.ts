import {jwtDecode} from "jwt-decode"
import { api, errorHandler } from "../api"
import { Booking, User } from "./model"

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

export const getUserBookings = async (userId: string) => {
    try {
        const response = await api.get(`users/${userId}/bookings`).json<Booking[]>();
        return response;
    } catch (error) {
        console.error("Ошибка при получении записей пользователя:", error);
        throw new Error("Не удалось загрузить записи.");
    }
};

export const cancelUserBooking = async (userId: string, bookingId: string) => {
    try {
        const response = await api
            .put(`users/${userId}/bookings/${bookingId}/cancel`)
            .json<{ message: string }>();

        return response;
    } catch (error) {
        console.error("Ошибка при отмене записи:", error);
        throw new Error("Не удалось отменить запись.");
    }
};
