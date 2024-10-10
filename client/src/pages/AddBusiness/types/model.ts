import { sample } from "effector";
import { addBusinessFx } from "../../../shared/business";

sample({
    clock: addBusinessFx,
    fn: (business) => business,
    target: addBusinessFx,
});
