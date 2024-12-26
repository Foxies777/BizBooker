import { createEffect, createEvent, createStore, sample } from "effector";
import { CreateServiceRequest, Service } from "../api/service/model";
import { createService } from "../api/service";

export const addService = createEvent<CreateServiceRequest>();
export const createServiceFx = createEffect(createService);

sample({
    clock: addService,
    target: createServiceFx,
});

export const $services = createStore<Service[]>([])
    .on(createServiceFx.doneData, (state, newService) => [...state, newService] as Service[])
    .on(createServiceFx.failData, (state, error) => {
        console.error("Failed to create service:", error);
        return state;
    } );
