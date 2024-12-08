export type Body = {
    id: string
    surname: string
    name: string
    patronymic?: string
    email: string
    phone: string
    password: string
    role: "client" | "business" | "admin"
}

export type Response = {
    token: string
    user: { email: string id: number }
}

export type User = {
    id: string
    surname: string
    name: string
    patronymic?: string
    email: string
    phone: string
    password: string
    role: "client" | "business" | "admin"
}
