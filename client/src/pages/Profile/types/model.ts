import { createEffect, restore } from "effector"
import { getUser } from "../../../shared/api/user"
import { User } from "../../../shared/api/user/model"

export const getUserFx = createEffect<string, User>(async (token) => {
  const user = await getUser(token)
  console.log("getUserFx effect: fetched user", user)
  return user
})

export const $user = restore<User | null>(getUserFx.doneData, null)

$user.watch((state) => {
  console.log("User store updated:", state)
})