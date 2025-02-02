import { api } from "../api";
import { CreateServiceRequest, Service, UpdateServiceRequest } from "./model";

export const createService = async(service: CreateServiceRequest)=>{
    try {
        const response = await api.post("service/create", {
            json: service,
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.json();
    } catch (error) {
        console.error(error);
    }
}
export const getBusinessServices = async(businessId: string)=>{
    try {
        console.log(businessId);
        
        const response = await api.get(`service/${businessId}`).json<Service[]>()
        console.log('1111111111111112222222222',response);
        
        return response
    } catch (error) {
        console.error("Services not found", error);
        throw new Error("Services not found");
    }
}

export const updateService = async (serviceId: string, updateData: UpdateServiceRequest) => {
    try {
        const response = await api.put(`service/${serviceId}`, {
            json: updateData,
        });
        return response.json<Service>();
    } catch (error) {
        console.error("Ошибка обновления услуги:", error);
        throw new Error("Failed to update service");
    }
};

// Удалить услугу
export const deleteService = async (serviceId: string) => {
    try {
        await api.delete(`service/${serviceId}`);
        return { message: "Service deleted successfully" };
    } catch (error) {
        console.error("Ошибка удаления услуги:", error);
        throw new Error("Failed to delete service");
    }
};