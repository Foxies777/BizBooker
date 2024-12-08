import ky, { HTTPError } from "ky"

export const api = ky.create({
    prefixUrl: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    hooks: {
        beforeRequest: [
            request => {
                const token = localStorage.getItem("token")
                if (token) {
                    request.headers.set("Authorization", `Bearer ${token}`)
                }
            }
        ],
        afterResponse: [
            (request, options, response) => {
                if (!response.ok) {
                    console.error('HTTP error', response.status, response.statusText)
                }
            }
        ]
    }
})

export class ValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "ValidationError"
    }
}

export const errorHandler = async (error: unknown) => {
    const httpError = error as HTTPError
    if (httpError.name === "HTTPError") {
        const serverMessage = await httpError.response.text()
        throw new Error(serverMessage)
    } else {
        if (error instanceof ValidationError) {
            throw error
        } else {
            throw new Error(httpError.message)
        }
    }
}
