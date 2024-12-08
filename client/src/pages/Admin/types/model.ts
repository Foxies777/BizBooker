import { sample } from "effector"
import { addCategoryFx } from "../../../shared/business"


sample({
    clock: addCategoryFx,
    fn: (category) => category,
    target: addCategoryFx,
})