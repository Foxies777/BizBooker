import { useUnit } from "effector-react";
import { updateServicesForStaffFx } from "../../../../shared/staff";

export const useUpdateServices = () => {
    const updateServices = useUnit(updateServicesForStaffFx);
    return {
        updateServices,
        loading: updateServicesForStaffFx.pending,
    };
};
