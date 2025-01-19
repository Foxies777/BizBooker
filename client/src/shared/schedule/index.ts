// import { createEffect, createEvent, createStore } from "effector"
// import { CreateScheduleRequest, Schedule } from "../api/schedule/model"
// import { createSchedule } from "../api/schedule"

// export const addSchedule = createEvent<CreateScheduleRequest>()

// export const addScheduleFx = createEffect(
//     async (schedule: CreateScheduleRequest) => {
//         console.log("addScheduleFx", schedule)

//         const response = await createSchedule(schedule)
//         return response
//     }
// )

// addSchedule.watch((schedule) => {
//     addScheduleFx(schedule)
// })

// export const $schedules = createStore<Schedule[]>([])
//     .on(addScheduleFx.doneData, (state, newSchedule) => [...state, newSchedule])
//     .on(addScheduleFx.failData, (state, error) => {
//         console.error("Failed to create schedule:", error)
//         return state
//     })
