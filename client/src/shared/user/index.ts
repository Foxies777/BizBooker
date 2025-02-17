import { createEffect, createEvent, restore, sample } from "effector";
import { Booking } from "../api/user/model";
import { cancelUserBooking, getUserBookings } from "../api/user";
import { tokenExprired } from "../auth";

export const fetchUserBookingsFx = createEffect<string, Booking[]>(
    async (userId) => await getUserBookings(userId)
);


export const cancelBookingFx = createEffect<{ userId: string; bookingId: string }, void>(
    async ({ userId, bookingId }) => {
        await cancelUserBooking(userId, bookingId);
    }
);

// ✅ Событие обновления списка записей после отмены
export const removeBooking = createEvent<string>();

// ✅ Хранилище записей
export const $userBookings = restore<Booking[]>(fetchUserBookingsFx.doneData, [])
    .on(removeBooking, (state, bookingId) => state.filter((booking) => booking._id !== bookingId))
    .reset(tokenExprired)

