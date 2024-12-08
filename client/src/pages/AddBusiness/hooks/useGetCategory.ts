import { useEffect } from "react"
import { useUnit } from "effector-react"
import { $categories, fetchCategoriesFx } from "../types/model"

export const useGetCategory = () => {
    const categories = useUnit($categories)
    const catLoading = useUnit(fetchCategoriesFx.pending)

    useEffect(() => {
        fetchCategoriesFx()
    }, [])

    return [categories, catLoading] as const
}
