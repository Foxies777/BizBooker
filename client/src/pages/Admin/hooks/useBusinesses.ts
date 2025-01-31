// useCreateCategory.ts
import { useUnit } from "effector-react";
import { useState } from "react";
import { addCategory, resetForm } from "../../../shared/business"; // Импортируем resetForm
import { CreateCategoryRequest } from "../../../shared/api/business/model";

export const useCreateCategory = () => {
    const [loading, setLoading] = useState(false);
    const createCategory = useUnit(addCategory);
    const resetFormEvent = useUnit(resetForm); // Получаем событие resetForm

    const handleCreateCategory = (category: CreateCategoryRequest) => {
        setLoading(true);
        try {
            console.log("try handleCreateCategory:", category);
            createCategory(category); // Ждем завершения
            resetFormEvent(); // Вызываем resetForm после успешного создания
        } catch (error) {
            console.error("Failed to create category:", error);
        } finally {
            setLoading(false);
        }
    };

    return { handleCreateCategory, loading };
};