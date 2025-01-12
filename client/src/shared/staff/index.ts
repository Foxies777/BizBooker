import { createEffect, createStore } from "effector";
import { addServicesToStaff, getBusinessStaff } from "../api/staff";
import { StaffResponse } from "../api/staff/model";
export const fetchBusinessStaffFx = createEffect(async (businessId: string) => {
    return await getBusinessStaff(businessId);
});

export const $pendingStaff = createStore<StaffResponse["pendingStaff"]>([])
    .on(fetchBusinessStaffFx.doneData, (_, data) => data.pendingStaff);

export const $activeStaff = createStore<StaffResponse["activeStaff"]>([])
    .on(fetchBusinessStaffFx.doneData, (_, data) => data.activeStaff);



    export const addServicesToStaffFx = createEffect(async ({ staffId, serviceIds }: { staffId: string; serviceIds: string[] }) => {
        return await addServicesToStaff(staffId, serviceIds);
    });