import { createEvent, createStore } from "effector"
import { persist } from "effector-storage/local"
import { User } from "../api/auth/model"

export const $token = createStore<string>("")
export const tokenRecived = createEvent<string>()
export const tokenExprired = createEvent()
tokenExprired.watch(() => {
  console.log("tokenExprired event triggered");
  setUser(null); // Принудительно сбрасываем пользователя
  localStorage.removeItem("token"); // Удаляем токен
});

$token
  .on(tokenRecived, (_, token) => token)
  .reset(tokenExprired)

export const $isAuth = $token.map((state) => !!state)

persist({
  store: $token,
  key: "token",
  serialize: (value) => value,
  deserialize: (value) => value,
})


export const setUser = createEvent<User | null>()
export const $user = createStore<User | null>(null)
    .on(setUser, (_, user) => user) // Один обработчик
    .reset(tokenExprired); // Сброс при вызове tokenExprired