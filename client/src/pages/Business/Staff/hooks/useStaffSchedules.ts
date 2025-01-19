import { useUnit } from "effector-react";
import {
    fetchSchedules,
    $staffSchedules,
    getStaffSchedulesFx,
} from "../types/model";

export const useStaffSchedules = (staffId: string, businessId: string) => {
    const [schedules, loading] = useUnit([
        $staffSchedules,
        getStaffSchedulesFx.pending,
    ]);
    const fetchStaffSchedules = () => {
        fetchSchedules({ staffId, businessId });
    };

    return { schedules, fetchStaffSchedules, loading };
};
