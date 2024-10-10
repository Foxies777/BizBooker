import { createEffect, restore } from "effector";
import { getAllCategories, getBusinesses } from "../../../shared/api/business";


export const getBusinessesFx = createEffect(getBusinesses)
export const $businesses = restore(getBusinessesFx, [])

export const getCateroryFx = createEffect(getAllCategories)
export const $allCategories = restore(getCateroryFx, [])