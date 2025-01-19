import { api } from "../api";
import {
    CreateScheduleRequest,
    CreateScheduleResponse,
    StaffScheduleResponse,
} from "./model";

// Create a new schedule
export const createSchedule = async (
    data: CreateScheduleRequest
): Promise<CreateScheduleResponse> => {
    try {
        const response = await api.post("schedules/add", {
            json: data,
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.json());

        return response.json();
    } catch (error) {
        console.error("Error creating schedule", error);
        throw new Error("Failed to create business");
    }
};

// Retrieve schedules for a business and staff
export const getStaffSchedules = async (
    staffId: string,
    businessId: string
) => {
    try {
        const response = await api
            .get(`schedules/${businessId}/staff/${staffId}`)
            .json<StaffScheduleResponse[]>();
        console.log("111111111111;", response);

        return response;
    } catch (error) {
        console.error("Schedule not found", error);
        throw new Error("Schedule not found");
    }
};
