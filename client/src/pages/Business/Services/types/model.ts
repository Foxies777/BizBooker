import { attach, createEffect, restore, sample } from "effector";
import { createService, getBusinessServices } from "../../../../shared/api/service";
import { $currentBusiness } from "../../../../shared/business";
import { CreateServiceRequest, Service } from "../../../../shared/api/service/model";
import { showErrorMessageFx, showSuccessMessageFx } from "../../../../shared/notification";





export const createServiceFx = attach({
    source: $currentBusiness,
    effect: createEffect(
        async ({ service, currentBusiness }: { service: CreateServiceRequest, currentBusiness: any }): Promise<Service> => {
            const businessId = currentBusiness._id

            const response = await createService({ ...service, businessId })
            return response as Service;
        }
    ),
    mapParams: (service: CreateServiceRequest, currentBusiness) => ({
        service,
        currentBusiness,
    }),
})


export const getBusinessServicesFx = createEffect(async (businessId: string):Promise<Service[]>=>{
    const response = await getBusinessServices(businessId)
    return response
})
export const $businessService = restore<Service[]>(
    getBusinessServicesFx.doneData,
    []
)

sample({
    clock: createServiceFx.doneData,
    source: $currentBusiness,
    fn(currentBusiness){
        return currentBusiness._id
    },
    target: getBusinessServicesFx
})


sample({
    clock: createServiceFx.doneData,
    fn() {
        return "Услуга создана"
    },
    target: showSuccessMessageFx,
})
sample({
    clock: createServiceFx.failData,
    target: showErrorMessageFx,
})
