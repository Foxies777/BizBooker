import { api } from "../api";
import { Staff, StaffBusinessesResponse, StaffDetailsResponse, StaffResponse } from "./model";

export const createStaff = async (data: {
    userId: string;
    role: string;
}): Promise<Staff> => {
    try {
        console.log(data.role);
        const updateUser = {
            role: data.role,
        };
        const response = await api.put(`users/${data.userId}`, {
            json: updateUser,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.json();
    } catch (error) {
        console.error("Error in addStaff:", error);
        throw new Error("Failed to add staff");
    }
};
export const getBusinessStaff = async (businessId:string): Promise<StaffResponse> => {
    try {
        
        const response = await api.get(`business/${businessId}/staffs`);
        return response.json();
    } catch (error) {
        // Handle error
        console.error("Error in getBusinessStaff:", error);
        throw new Error("Failed to fetch business staff");
    }
};

// Добавить услуги к сотруднику
export const addServicesToStaff = async (staffId: string, serviceIds: string[]) => {
    return api.post("service/add", {
        json: { staffId, serviceIds },
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getStaffBusinesses = async (staffId: string) =>{
    try {
        
        const response = await api.get(`staff/getBusinesses/${staffId}`);
        return response.json<StaffBusinessesResponse[]>();
    } catch (error) {
        console.error("Error in getStaffBusinesses:", error);
        throw new Error("Failed to fetch staff business");
    }
};
export const getStaffDetailsByBusiness = async (
    businessId: string,
    staffId: string
): Promise<StaffDetailsResponse> => {
    try {
        const response = await api.get(
            `staff/${businessId}/staff/${staffId}/details`
        );
        return response.json<StaffDetailsResponse>();
    } catch (error) {
        console.error("Error fetching staff details:", error);
        throw error;
    }
};