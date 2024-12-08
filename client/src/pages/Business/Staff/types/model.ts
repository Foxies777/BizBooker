import { attach, createEffect, restore, sample } from "effector"

import {
    createStaff,
    CreateStaffRequest,
    getBusinesseStaffs,
    showErrorMessageFx,
    showSuccessMessageFx,
    Staff,
    $currentBusiness
} from "../index"

export const createStaffFx = attach({
    source: $currentBusiness,
    effect: createEffect(
        async ({ staff, currentBusiness }: { staff: CreateStaffRequest, currentBusiness: any }): Promise<Staff> => {
            const businessId = currentBusiness._id

            const response = await createStaff({ ...staff, businessId })
            return response
        }
    ),
    mapParams: (staff: CreateStaffRequest, currentBusiness) => ({
        staff,
        currentBusiness,
    }),
})

export const getBusinessStaffsFx = createEffect(async (businessId: string): Promise<Staff[]> => {
    const response = await getBusinesseStaffs(businessId)
    return response
})
export const $businessStaffs = restore<Staff[]>(
    getBusinessStaffsFx.doneData,
    []
)

sample({
    clock: createStaffFx.doneData,
    source: $currentBusiness,
    fn(currentBusiness){
        return currentBusiness._id
    },
    target: getBusinessStaffsFx
})

sample({
    clock: createStaffFx.doneData,
    fn() {
        return "Сотрудник создан"
    },
    target: showSuccessMessageFx,
})
sample({
    clock: createStaffFx.failData,
    target: showErrorMessageFx,
})
