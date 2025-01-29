import { createEffect, restore } from "effector";
import { Booking } from "./api/user/model";
import { getUserBookings } from "./api/user";

export const fetchUserBookingsFx = createEffect<string, Booking[]>(
    async (userId) => await getUserBookings(userId)
);

// Store для хранения записей
export const $userBookings = restore<Booking[]>(fetchUserBookingsFx.doneData, []);