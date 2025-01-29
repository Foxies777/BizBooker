export type CreateStaffRequest = {
    _id: string;
    role: string;
};
export type Staff = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    service?: string;
    createdAt: string;
};
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
        }[];
    }[];
};
export type StaffBusinessesResponse = {
    businessId: {
        _id: string;
        name: string;
    };
};

export type Service = {
    _id: string;
    name: string;
    description?: string;
    duration: string;
    price: string;
};

export type Break = {
    startBreak: string;
    endBreak: string;
};

export type WorkHour = {
    _id: string;
    scheduleType: "temporary" | "permanent" | "recurring";
    startTime: string;
    endTime: string;
    daysOff: string[];
    breaks: Break[];
};

export type Schedule = {
    scheduleType: string;
    startDate?: string;
    endDate?: string;
    daysOff?: string[];
    workHours: WorkHour[];
};

export type Business = {
    id: string;
    name: string;
};

export type StaffDetailsResponse = {
    business: {
        _id: string;
        name: string;
    };
    services: Service[];
    schedule: Schedule | null;
};
export type Booking = {
    serviceName: string;
    serviceDuration: number;
    servicePrice: number;
    date: string; 
    startTime: string; 
    endTime: string; 
    clientName: string;
    status: string; 
};