import { api } from "../api"
import { CreateStaffRequest, Staff } from "./model"

export const createStaff = async (
    staff: CreateStaffRequest
): Promise<Staff> => {
    try {
        console.log(staff)

        const response = await api.post("staff/addStaff", {
            json: staff,
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.json()
    } catch (error) {
        console.error("Error in addStaff:", error)
        throw new Error("Failed to add staff")
    }
}
export const getBusinesseStaffs = async (businessId: string) => {
    try {
        const response = await api
            .get(`business/${businessId}/staffs`)
            .json<Staff[]>()
        console.log(`Received staffs for business ID ${businessId}:`, response)
        return response
    } catch (error) {
        console.error("Error in getBusinesseStaffs:", error)
        throw new Error("Failed to get staffs")
    }
}
