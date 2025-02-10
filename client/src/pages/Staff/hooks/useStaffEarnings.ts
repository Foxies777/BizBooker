import { useUnit } from "effector-react";
import { $staffEarnings, fetchStaffEarningsFx } from "../../../shared/staff";
import { useEffect } from "react";
import { Dayjs } from "dayjs";

export const useStaffEarnings = (businessId: string, staffId: string, selectedDate: Dayjs) => {
    const earnings = useUnit($staffEarnings);
    const isLoading = useUnit(fetchStaffEarningsFx.pending);

    useEffect(() => {
        fetchStaffEarningsFx({
            businessId,
            staffId,
            date: selectedDate.format("YYYY-MM-DD"),
        });
    }, [businessId, staffId, selectedDate]);

    return { earnings, isLoading };
};