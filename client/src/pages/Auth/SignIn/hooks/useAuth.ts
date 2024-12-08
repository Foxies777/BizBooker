import { useUnit } from "effector-react"
import { signInFx } from "../index"

export const useAuth = () => {
    const [singIn, loading] = useUnit([signInFx, signInFx.pending])
    return [singIn, loading] as const
}
