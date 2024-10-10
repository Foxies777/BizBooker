import { createEffect, sample } from "effector";
import { signUp } from "../../../shared/api/auth";
import { $token, tokenRecived } from "../../../shared/auth";
import { showErrorMessageFx } from "../../../shared/notification";

export const signUpFx = createEffect(signUp);

sample({
    clock: signUpFx.doneData,
    source: $token,
    fn(_, clk) {
        return clk.token;
    },
    target: tokenRecived,
});

sample({
    clock: signUpFx.failData,
    target: showErrorMessageFx,
});
