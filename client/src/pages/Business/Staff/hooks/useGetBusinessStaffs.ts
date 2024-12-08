import { useUnit } from "effector-react"
import { $businessStaffs, getBusinessStaffsFx, $currentBusiness } from "../index"
import { useEffect } from "react"


export const useGetBusinessStaffs = () =>{
    const [businessStaffs, loading] = useUnit([$businessStaffs, getBusinessStaffsFx.pending])
    const currentBusiness = useUnit($currentBusiness)
    useEffect(() => {
        getBusinessStaffsFx(currentBusiness._id)
    }, [])
    return [businessStaffs, loading] as const
}