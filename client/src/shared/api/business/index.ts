import { api } from "../api";
import {
    Business,
    Category,
    CreateBusinessRequest,
    CreateCategory,
} from "./model";

// Функция для создания нового бизнеса
export const createBusiness = async (
    business: CreateBusinessRequest
): Promise<Business> => {
    try {
        console.log(business);

        const response = await api.post("business/create", {
            json: business,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.json();
    } catch (error) {
        console.error("Error in createBusiness:", error);
        throw new Error("Failed to create business");
    }
};

// Остальные функции
export const getBusinesses = async () => {
    try {
        const response = await api.get("business").json<Business[]>();
        return response;
    } catch (error) {
        console.error("Error in getBusinesses:", error);
        throw new Error("Failed to get businesses");
    }
};
export const createCategory = async (category: CreateCategory) => {
    try {
        const response = await api.post("category/create", {
            json: category,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.json();
    } catch (error) {
        console.error("Error in createCategory:", error);
        throw new Error("Failed to create category");
    }
};

export const getAllCategories = async () => {
    try {
        const response = await api.get("category").json<Category[]>();
        return response;
    } catch (error) {
        console.error("Error in getAllCategories:", error);
        throw new Error("Failed to fetch categories");
    }
};
