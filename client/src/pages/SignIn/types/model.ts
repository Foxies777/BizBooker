import { createEffect, sample } from "effector";
import { signIn } from "../../../shared/api/auth";
import { tokenRecived } from "../../../shared/auth";
import { showErrorMessageFx } from "../../../shared/notification";

export const signInFx = createEffect(signIn)

sample({
    clock: signInFx.doneData,
    fn(response) {
        return response.token
    },
    target: tokenRecived
})

sample({
    clock: signInFx.failData,
    target: showErrorMessageFx
})