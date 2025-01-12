export type CreateStaffRequest = {
    _id: string,
    role: string
}
export type Staff = {
    _id: string
    name: string
    email: string
    phone: string
    service?: string
    createdAt: string
}
export type StaffResponse = {
    pendingStaff: {
        id: string;
        name: string;
        email: string;
        phone: string;
        status: "pending";
    }[];
    activeStaff: {
        id: string;
        name: string;
        email: string;
        phone: string;
        status: "active";
        services?: {
            id: string;
            name: string;
            description: string;
        }[]
    }[];
};