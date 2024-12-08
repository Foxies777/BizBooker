import { createEffect, restore, sample } from "effector"
import { getBusinesses, getUserBusinesses } from "../../../shared/api/business"
import { showErrorMessageFx } from "../../../shared/notification"
import { Business } from "../../../shared/api/business/model"

export const getBusinessesFx = createEffect(getBusinesses)
export const $businesses = restore(getBusinessesFx, [])

export const getUserBusinessesFx = createEffect<string, Business[]>(
    async (token) => {
        const response = await getUserBusinesses(token)
        return response
    }
)
export const $userBusinesses = restore<Business[]>(
    getUserBusinessesFx.doneData,
    []
)

sample({
    clock: getBusinessesFx.failData,
    target: showErrorMessageFx,
})
