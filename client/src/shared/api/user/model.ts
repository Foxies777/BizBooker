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
    user: { email: string; id: number }
}

export type User = {
    _id: string
    surname: string
    name: string
    patronymic?: string
    email: string
    phone: string
    password: string
    role: "client" | "staff" | "business" | "admin"
}
export type Booking = {
    businessName: string;
    serviceName: string;
    serviceDuration: number;
    servicePrice: number;
    staffName: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
};
