import { createEffect, createStore } from "effector"
import { Category } from "../../../shared/api/business/model"
import { getAllCategories } from "../../../shared/api/business"

export const fetchCategoriesFx = createEffect(getAllCategories)
export const $categories = createStore<Category[]>([])
    .on(fetchCategoriesFx.doneData, (_, categories) => categories)
