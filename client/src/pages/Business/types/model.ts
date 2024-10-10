import { createEffect, restore } from "effector";
import { getBusinesses } from "../../../shared/api/business";


export const getBusinessesFx = createEffect(getBusinesses)
export const $businesses = restore(getBusinessesFx, [])

