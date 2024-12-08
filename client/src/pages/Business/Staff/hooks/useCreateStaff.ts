import { useUnit } from "effector-react"
import { createStaffFx } from "../index"


export const useCreateStaff = () =>{
    const [staff, loading] = useUnit([createStaffFx, createStaffFx.pending])
    return [staff, loading] as const
}