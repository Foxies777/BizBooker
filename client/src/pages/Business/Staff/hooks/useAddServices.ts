import { useUnit } from "effector-react";
import { addServicesToStaffFx } from "../../../../shared/staff";

export const useAddServices = () => {
    const [addServices, loading] = useUnit([addServicesToStaffFx, addServicesToStaffFx.pending]);
    return { addServices, loading };
};