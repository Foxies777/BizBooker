import { useUnit } from "effector-react";
import { $staffBookings, fetchStaffBookingsFx } from "../../../shared/staff";

export const useStaffBookings = () => {
    const [bookings, loading] = useUnit([
        $staffBookings,
        fetchStaffBookingsFx.pending,
    ]);

    const fetchBookings = (businessId: string, staffId: string) => {
        fetchStaffBookingsFx({ businessId, staffId });
    };

    return { bookings, loading, fetchBookings };
};
