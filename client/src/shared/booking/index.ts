import { createEffect, restore, createEvent, sample, createStore } from "effector";
import {
    AvailableDate,
    BookingRequest,
    BookingResponse,
    Service,
    Specialist,
} from "../api/booking/model";
import {
    createBooking,
    getAvailableDatesForServiceAndStaff,
    getAvailableServices,
    getSpecialistsByService,
} from "../api/booking";
import { showErrorMessageFx } from "../notification";
import dayjs from 'dayjs';

// Effects
export const fetchServicesFx = createEffect<string, Service[]>(getAvailableServices);
export const fetchSpecialistsFx = createEffect<{ serviceId: string; businessId: string }, Specialist[]>(
    ({ serviceId, businessId }) => getSpecialistsByService(serviceId, businessId)
);

export const fetchAvailableDatesFx = createEffect<{ serviceId: string; staffId: string }, AvailableDate[]>(
    ({ serviceId, staffId }) =>
        getAvailableDatesForServiceAndStaff(serviceId, staffId).then((response) => {
            const availableDates = response.map((item) => ({
                date: item.date,
                times: item.availableTimes.map(timeSlot =>
                    `${dayjs(timeSlot.start).format("HH:mm")}`
                ),
            }));
            return availableDates;
        })
);

export const createBookingFx = createEffect<BookingRequest, BookingResponse>(createBooking);

export const modalClosed = createEvent();
// Stores
export const $services = restore<Service[]>(fetchServicesFx.doneData, []).reset(modalClosed);
export const $specialists = restore<Specialist[]>(fetchSpecialistsFx.doneData, [])
    .reset(modalClosed);

export const $availableDates = restore<{ date: string; times: string[] }[]>(
    fetchAvailableDatesFx.doneData,
    []
).reset(modalClosed); 




// Booking status store for UI
export const bookingPending = createEvent();
export const bookingSuccess = createEvent();
export const bookingFailure = createEvent();

export const $bookingStatus = createStore("idle")
    .on(bookingPending, () => "pending")
    .on(bookingSuccess, () => "success")
    .on(bookingFailure, () => "failure");

// Error handling
sample({
    clock: [
        fetchServicesFx.fail,
        fetchSpecialistsFx.fail,
        fetchAvailableDatesFx.fail,
        createBookingFx.fail,
    ],
    fn: (error) => error.error || "Произошла ошибка при загрузке данных",
    target: showErrorMessageFx,
});
