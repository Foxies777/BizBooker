import { createEffect, restore, sample } from "effector"
import { createCategory, getAllCategories, getBusinesses } from "../../../shared/api/business"
import { showErrorMessageFx, showSuccessMessageFx } from "../../../shared/notification"

export const getBusinessFx = createEffect(getBusinesses)
export const getCategoryFx = createEffect(getAllCategories)
export const $business = restore(getBusinessFx, null)

export const createBusinessFx = createEffect(createCategory)

sample({
    clock: createBusinessFx.doneData,
    source: $business,
    target: [getBusinessFx],
})
sample({
    clock: createBusinessFx.doneData,
    fn() {
        return "Бизнес создан"
    },
    target: showSuccessMessageFx,
})


sample({
    clock: createBusinessFx.failData,
    target: showErrorMessageFx,
})
sample({
    clock: getBusinessFx.failData,
    target: showErrorMessageFx,
})

// sample({
//     clock: addBusinessFx,
//     fn: (business) => business,
//     target: addBusinessFx,
// })


// shared/business/index.ts
import { createStore } from "effector"
import { Category } from "../../../shared/api/business/model"

// Эффект для получения всех категорий
export const fetchCategoriesFx = createEffect(async () => {
    const categories = await getAllCategories()
    return categories
})

// Хранилище для категорий
export const $categories = createStore<Category[]>([])
    .on(fetchCategoriesFx.doneData, (_, categories) => categories)
