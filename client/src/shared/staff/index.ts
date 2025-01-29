import { createEffect, createStore, restore, sample } from "effector";
import { addServicesToStaff, getBusinessStaff, getStaffBookings, getStaffBusinesses, getStaffDetailsByBusiness } from "../api/staff";
import { Booking, StaffBusinessesResponse, StaffDetailsResponse, StaffResponse } from "../api/staff/model";
import { showErrorMessageFx } from "../notification";
export const fetchBusinessStaffFx = createEffect(async (businessId: string) => {
    return await getBusinessStaff(businessId);
});

export const $pendingStaff = createStore<StaffResponse["pendingStaff"]>([])
    .on(fetchBusinessStaffFx.doneData, (_, data) => data.pendingStaff);

export const $activeStaff = createStore<StaffResponse["activeStaff"]>([])
    .on(fetchBusinessStaffFx.doneData, (_, data) => data.activeStaff);



export const addServicesToStaffFx = createEffect(async ({ staffId, serviceIds }: { staffId: string; serviceIds: string[] }) => {
    return await addServicesToStaff(staffId, serviceIds);
})

export const fetchStaffBusinessFx = createEffect<string,StaffBusinessesResponse[]>(async (staffId) =>{
   return await getStaffBusinesses(staffId)
});

export const $staffBusinesses = restore<StaffBusinessesResponse[]>(fetchStaffBusinessFx.doneData, [])

export const fetchStaffDetailsFx = createEffect<
    { businessId: string; staffId: string },
    StaffDetailsResponse
>(({ businessId, staffId }) =>
    getStaffDetailsByBusiness(businessId, staffId)
);

export const $staffDetails = createStore<StaffDetailsResponse | null>(null);

export const fetchStaffBookingsFx = createEffect<
    { businessId: string; staffId: string },
    Booking[]
>(({ businessId, staffId }) => getStaffBookings(businessId, staffId));

// Хранилище для данных записей
export const $staffBookings = restore<Booking[]>(fetchStaffBookingsFx.doneData, []);

// Обработка ошибок
sample({
    clock: fetchStaffBookingsFx.failData,
    target: showErrorMessageFx,
});
sample({
    clock: fetchStaffDetailsFx.doneData,
    target: $staffDetails,
});


sample({
    clock: fetchStaffBusinessFx.failData,
    target: showErrorMessageFx,
})