// model.ts

export type CreateScheduleRequest = {
    scheduleType: "temporary" | "permanent" | "recurring";
    startDate?: string; // YYYY-MM-DD
    endDate?: string; // YYYY-MM-DD
    daysOff?: string[];
    workHours: {
        startTime: string; // HH:mm
        endTime: string; // HH:mm
    };
    breaks: {
        startBreak: string; // HH:mm
        endBreak: string; // HH:mm
    }[];
    staffId: string;
    businessId: string;
};

export type CreateScheduleResponse = {
    _id: string;
    staffId: string;
    businessId: string;
    scheduleType: "temporary" | "permanent" | "recurring";
    startDate?: string;
    endDate?: string;
    daysOff?: string[];
    workHours: {
        startTime: string;
        endTime: string;
    };
    breaks: {
        startBreak: string;
        endBreak: string;
    }[];
    createdAt: string;
    updatedAt: string;
};

export type StaffScheduleResponse = {
    _id: string;
    scheduleType: "temporary" | "permanent" | "recurring";
    startDate?: string;
    endDate?: string;
    daysOff?: string[];
    workHours: {
        startTime: string;
        endTime: string;
        breaks: {
            startBreak: string;
            endBreak: string;
        }[];
    };
};
