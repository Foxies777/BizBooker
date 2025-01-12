import { createEffect, createEvent, restore, sample } from "effector"
import { getUser } from "../../../shared/api/user"
import { User } from "../../../shared/api/user/model"
import { showErrorMessageFx, showSuccessMessageFx } from ".."
import {createStaff} from '../../../shared/api/staff/index'
export const getUserFx = createEffect<string, User>(async (token) => {
  const user = await getUser(token)
  console.log("getUserFx effect: fetched user", user)
  return user
})

export const $user = restore<User | null>(getUserFx.doneData, null)

$user.watch((state) => {
  console.log("User store updated:", state)
})


export const updateToStaffFx = createEffect(createStaff)


export const updateToStaff = createEvent<{ userId: string, role: string }>()

sample({
  clock: updateToStaff,
  fn: (payload) => ({
    userId: payload.userId,
    role: payload.role,
  }),
  target: updateToStaffFx,
})
sample({
  clock: updateToStaffFx.doneData,
  fn: () => localStorage.getItem("token") || "",
  target: getUserFx,
})
sample({
  clock: updateToStaffFx.doneData,
  fn: () => 'Вы стали сотрудником',
  target: showSuccessMessageFx,
})
sample({
  clock: updateToStaffFx.failData,
  target: showErrorMessageFx,
})