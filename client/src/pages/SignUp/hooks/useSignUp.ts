import { useUnit } from "effector-react"
import { signUpFx } from "../types/model"

export const useSignUp = () =>{
    const [signUp, loading] = useUnit([signUpFx, signUpFx.pending])
    return [signUp, loading] as const
}