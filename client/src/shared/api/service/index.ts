import { api } from "../api";
import { CreateServiceRequest, Service } from "./model";

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