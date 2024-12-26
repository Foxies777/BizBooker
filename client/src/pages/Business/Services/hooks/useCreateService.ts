import { useUnit } from "effector-react"
import { createServiceFx } from "../types/model"

export const useCreateService = () =>{
    const [service, loading] = useUnit([createServiceFx, createServiceFx.pending])
    return [service, loading] as const
}