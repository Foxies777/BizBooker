import { createEffect, createEvent, createStore, sample } from "effector"
import { createStaff } from "../api/staff"
import { CreateStaffRequest, Staff } from "../api/staff/model"



export const addStaff = createEvent<CreateStaffRequest>()

export const addStaffFx = createEffect(async (staff: CreateStaffRequest): Promise<Staff> => {
    const response = await createStaff(staff)
    return response
})

sample({
    clock: addStaff,
    target: addStaffFx
})

export const $staff = createStore<Staff[]>([])
    .on(addStaffFx.doneData, (state, newStaff) => [...state, newStaff])
    .on(addStaffFx.failData, (state, error) => {
        console.error("Не удалось добавить сотрудника", error)
        return state
    })