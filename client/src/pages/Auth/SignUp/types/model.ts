import { createEffect, sample } from "effector"
import { $token, showErrorMessageFx, signUp, tokenRecived } from ".."


export const signUpFx = createEffect(signUp)

sample({
    clock: signUpFx.doneData,
    source: $token,
    fn(_, clk) {
        return clk.token
    },
    target: tokenRecived,
})

sample({
    clock: signUpFx.failData,
    target: showErrorMessageFx,
})
