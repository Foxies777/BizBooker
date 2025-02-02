import { createEffect, restore, createEvent, sample } from "effector";
import { createService, getBusinessServices, updateService, deleteService } from "../api/service";
import { Service, UpdateServiceRequest } from "../api/service/model";
import { showErrorMessageFx, showSuccessMessageFx } from "../notification";

// Эффекты API-запросов
export const fetchServicesFx = createEffect<string, Service[]>(getBusinessServices);
export const createServiceFx = createEffect(createService);
export const updateServiceFx = createEffect<{ serviceId: string; updateData: UpdateServiceRequest }, Service>(
    async ({ serviceId, updateData }) => {
        const updatedService = await updateService(serviceId, updateData);
        return updatedService;
    }
);
export const deleteServiceFx = createEffect(deleteService);

// События для обновления стора
export const removeService = createEvent<string>();
export const addService = createEvent<Service>();
export const updateServiceInStore = createEvent<Service>();

// Стор услуг
export const $services = restore(fetchServicesFx.doneData, [])
    .on(addService, (state, service) => [...state, service])
    .on(removeService, (state, serviceId) => state.filter((s) => s._id !== serviceId))
    .on(updateServiceInStore, (services, updatedService) => 
        services.map((service) => 
            (service._id === updatedService._id ? updatedService : service))
    );

sample({
    clock: updateServiceFx.doneData,
    target: updateServiceInStore,
});

// 🔔 Показываем уведомление об успешном обновлении
sample({
    clock: updateServiceFx.doneData,
    fn: () => "Обновление успешно!",
    target: showSuccessMessageFx,
});

// 🛑 Обработка ошибок
sample({
    clock: [fetchServicesFx.fail, createServiceFx.fail, updateServiceFx.fail, deleteServiceFx.fail],
    fn: (error) => error.error || "Ошибка при загрузке данных",
    target: showErrorMessageFx,
});
