import { createEffect, createStore } from "effector"
import { Category } from "../../../shared/api/business/model"
import { getAllCategories } from "../../../shared/api/business"

export const fetchCategoriesFx = createEffect(async () => {
    const categories = await getAllCategories()
    return categories
})
export const $categories = createStore<Category[]>([])
    .on(fetchCategoriesFx.doneData, (_, categories) => categories)
