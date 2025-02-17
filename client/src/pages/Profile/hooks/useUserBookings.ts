import { useUnit } from "effector-react";
import { $userBookings, fetchUserBookingsFx } from "../../../shared/user";

export const useUserBookings = () => {
    const [bookings, loading] = useUnit([$userBookings, fetchUserBookingsFx.pending]);
    return { bookings, fetchBookings: fetchUserBookingsFx, loading };
};