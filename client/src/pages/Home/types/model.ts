import { combine, createEffect, createEvent, restore, sample } from "effector";
import { getBusinesses } from "../../../shared/api/business";
import { showErrorMessageFx } from "../../../shared/notification";


export const getBusinessesFx = createEffect(getBusinesses)
export const $businesses = restore(getBusinessesFx, [])

// export const paginationChanged = createEvent<number>()
// export const queryChanged = createEvent<string>()
// export const $pagination = restore(paginationChanged, 1)
// export const $query = restore(queryChanged, '')

// const $paramsStore = combine({ _q : $query, _page: $pagination})

// sample({
//     clock: $paramsStore,
//     source: getBusinessesFx,
// })

sample({
    clock: getBusinessesFx.failData,
    target: showErrorMessageFx,
})