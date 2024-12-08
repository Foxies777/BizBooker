import { createEffect, restore } from "effector"
import { getBusinesses } from '../index'

export const getBusinessesFx = createEffect(getBusinesses)
export const $businesses = restore(getBusinessesFx, [])

