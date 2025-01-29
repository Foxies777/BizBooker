import { useUnit } from "effector-react";
import { $bookingStatus, createBookingFx } from "../../../shared/booking";

export const useCreateBooking = () => {
    const [bookingStatus, createBooking] = useUnit([
        $bookingStatus,
        createBookingFx,
    ]);

    return [ bookingStatus, createBooking ] as const
};