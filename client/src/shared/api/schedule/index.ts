import { api } from "../api"
import { CreateScheduleRequest, Schedule } from "./model"

export const createSchedule = async (
    schedule: CreateScheduleRequest
): Promise<Schedule> => {
    try {
        console.log(schedule)

        const response = await api.post("staff/schedule/create", {
            json: schedule,
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.json()
    } catch (error) {
        console.error("Error in createSchedule:", error)
        throw new Error("Failed to create schedule")
    }
}
