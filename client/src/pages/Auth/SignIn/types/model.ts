import { createEffect, sample } from "effector"
import { signIn } from "../../../../shared/api/auth"
import { showErrorMessageFx, tokenRecived } from ".."

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