import { useUnit } from "effector-react"
import { $businessService, getBusinessServicesFx } from "../types/model"
import { $currentBusiness } from "../../Staff"
import { useEffect } from "react"

export const useGetBusinessService = () =>{
    const [businessServices, loading] = useUnit([$businessService, getBusinessServicesFx.pending])
    const currentBusiness = useUnit($currentBusiness)
    useEffect(() => {
        getBusinessServicesFx(currentBusiness._id)
    }, [])
    return [businessServices, loading] as const
}