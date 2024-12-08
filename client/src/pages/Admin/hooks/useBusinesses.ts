import { useUnit } from "effector-react"
import { useState } from "react"
import { addCategory } from "../../../shared/business"
import { CreateCategoryRequest } from "../../../shared/api/business/model"

export const useCreateCategory = () => {
    const [loading, setLoading] = useState(false)
    const createCategory = useUnit(addCategory)

    const handleCreateCategory = async (
        category: CreateCategoryRequest
    ) => {
        setLoading(true)
        try {
            console.log("try handleCreateCategory:", category)
            createCategory(category)
        } catch (error) {
            console.error("Failed to create category:", error)
        } finally {
            setLoading(false)
        }
    }

    return { handleCreateCategory, loading }    
}