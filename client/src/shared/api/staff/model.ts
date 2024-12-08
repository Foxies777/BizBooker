export type CreateStaffRequest = {
    name: string
    email: string
    phone: string
    service?: string
    businessId: string
}
export type Staff = {
    _id: string
    name: string
    email: string
    phone: string
    service?: string
    createdAt: string
}