import { useState } from "react"
import { useUnit } from "effector-react"
import { addSchedule } from "../index"

export const useCreateSchedule = () => {
    const [loading, setLoading] = useState(false)
    const createSchedule = useUnit(addSchedule)

    const handleCreateSchedule = (schedule: any) => {
        setLoading(true)
        try {
            createSchedule(schedule)
        } catch (error) {
            console.error("Failed to create schedule:", error)
        } finally {
            setLoading(false)
        }
    }

    return { handleCreateSchedule, loading }
}
