import {
    createEffect,
    createEvent,
    createStore,
    restore,
    sample,
} from "effector";
import {
    addServicesToStaff,
    getBusinessStaff,
    getStaffBookings,
    getStaffBusinesses,
    getStaffDetailsByBusiness,
    getStaffEarnings,
    updateBookingStatus,
    updateServicesForStaff,
} from "../api/staff";
import {
    Booking,
    EarningsResponse,
    Service,
    StaffBusinessesResponse,
    StaffDetailsResponse,
    StaffResponse,
} from "../api/staff/model";
import { showErrorMessageFx, showSuccessMessageFx } from "../notification";
import { $currentBusiness } from "../business";
export const fetchBusinessStaffFx = createEffect(async (businessId: string) => {
    return await getBusinessStaff(businessId);
});

export const $pendingStaff = createStore<StaffResponse["pendingStaff"]>([]).on(
    fetchBusinessStaffFx.doneData,
    (_, data) => data.pendingStaff
);

export const $activeStaff = createStore<StaffResponse["activeStaff"]>([]).on(
    fetchBusinessStaffFx.doneData,
    (_, data) => data.activeStaff
);

export const addServicesToStaffFx = createEffect(
    async ({
        staffId,
        serviceIds,
    }: {
        staffId: string;
        serviceIds: string[];
    }) => {
        return await addServicesToStaff(staffId, serviceIds);
    }
);

export const fetchStaffBusinessFx = createEffect<
    string,
    StaffBusinessesResponse[]
>(async (staffId) => {
    return await getStaffBusinesses(staffId);
});

export const $staffBusinesses = restore<StaffBusinessesResponse[]>(
    fetchStaffBusinessFx.doneData,
    []
);

export const fetchStaffDetailsFx = createEffect<
    { businessId: string; staffId: string },
    StaffDetailsResponse
>(({ businessId, staffId }) => getStaffDetailsByBusiness(businessId, staffId));

export const $staffDetails = createStore<StaffDetailsResponse | null>(null);

export const fetchStaffBookingsFx = createEffect<
    { businessId: string; staffId: string },
    Booking[]
>(({ businessId, staffId }) => getStaffBookings(businessId, staffId));
export const updateBookingStatusInStore = createEvent<any>();

export const resetBookings = createEvent();
export const updateBookingStatusFx = createEffect<
    { bookingId: string; status: "completed" | "canceled" },
    Booking
>(async ({ bookingId, status }) => {
    return await updateBookingStatus(bookingId, status);
});
export const $staffBookings = restore<Booking[]>(
    fetchStaffBookingsFx.doneData,
    []
)
    .on(updateBookingStatusInStore, (state, updatedBooking) => {
        console.log("Текущее состояние бронирований:", state);
        console.log("Обновляемая запись:", updatedBooking);

        return state.map((booking) =>
            booking._id === updatedBooking.booking._id
                ? { ...booking, status: updatedBooking.booking.status }
                : booking
        );
    })
    .reset(resetBookings);

export const updateServicesForStaffFx = createEffect(
    async ({
        staffId,
        serviceIds,
    }: {
        staffId: string;
        serviceIds: string[];
    }) => {
        await updateServicesForStaff(staffId, serviceIds);
        return { staffId, serviceIds };
    }
);
export const fetchStaffEarningsFx = createEffect(
    async ({ businessId, staffId, date }: { businessId: string; staffId: string; date: string }) => {
        return await getStaffEarnings(businessId, staffId, date);
    }
);

// Хранилище данных о заработке
export const $staffEarnings = restore<EarningsResponse | null>(fetchStaffEarningsFx.doneData, null);

// Обработка ошибок
sample({
    clock: fetchStaffEarningsFx.fail,
    fn: () => console.error("Ошибка при загрузке заработка"),
});

sample({
    clock: updateBookingStatusFx.doneData,
    target: updateBookingStatusInStore,
});
sample({
    clock: updateBookingStatusFx.doneData,
    source: $staffBookings,
    fn: (bookings, updatedBooking) =>
        bookings.map((booking) =>
            booking._id === updatedBooking._id
                ? { ...booking, status: updatedBooking.status }
                : booking
        ),
    target: $staffBookings,
});

sample({
    clock: updateBookingStatusFx.failData,
    target: showErrorMessageFx,
});

sample({
    clock: updateBookingStatusFx.doneData,
    fn: () => "Статус записи успешно обновлён!",
    target: showSuccessMessageFx,
});
sample({
    clock: fetchStaffBookingsFx.fail,
    target: resetBookings,
});

sample({
    clock: updateServicesForStaffFx.doneData,
    source: $activeStaff,
    fn: (activeStaff, { staffId, serviceIds }) => {
        return activeStaff.map((staff) =>
            staff.id === staffId
                ? {
                      ...staff,
                      services: serviceIds.map(
                          (_id) =>
                              ({
                                  _id,
                                  name: "Загружается...",
                                  description: "",
                              } as Service)
                      ),
                  }
                : staff
        );
    },
    target: $activeStaff,
});
sample({
    clock: updateServicesForStaffFx.done,
    source: $currentBusiness,
    fn: (currentBusiness) => {
        console.log(currentBusiness);

        return currentBusiness?._id;
    },
    target: fetchBusinessStaffFx,
});

sample({
    clock: updateServicesForStaffFx.failData,
    target: showErrorMessageFx,
});

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
});
