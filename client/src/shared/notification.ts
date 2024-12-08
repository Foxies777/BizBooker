import { notification } from "antd"
import { createEffect } from "effector"

export const showErrorMessageFx = createEffect((error: Error) =>{
    console.error(error)
    
    notification.error({message: error.message})
})

export const showSuccessMessageFx = createEffect((message: string) =>{
    notification.success({message})
})