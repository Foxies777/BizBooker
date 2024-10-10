import { useState } from "react";
import { useUnit } from "effector-react";
import { jwtDecode } from "jwt-decode";
import { addBusiness } from "../../../shared/business";
import { CreateBusinessRequest } from "../../../shared/api/business/model";

type JwtPayload = {
    userId: string;
    // Добавьте другие поля, которые могут быть в вашем JWT токене
};

export const useCreateBusiness = () => {
    const [loading, setLoading] = useState(false);
    const createBusiness = useUnit(addBusiness);

    const handleCreateBusiness = async (
        business: Omit<CreateBusinessRequest, "userId">
    ) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found");
            }
            const decoded: JwtPayload = jwtDecode(token);
            const businessWithUserId = { ...business, userId: decoded.userId };
            console.log("try handleCreateBusiness:", businessWithUserId);
            createBusiness(businessWithUserId);
        } catch (error) {
            console.error("Failed to create business:", error);
        } finally {
            setLoading(false);
        }
    };

    return { handleCreateBusiness, loading };
};
