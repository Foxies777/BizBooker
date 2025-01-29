export type BookingRequest = {
    userId: string;
    serviceId: string;
    staffId: string;
    businessId: string;
    startTime: string;
    endTime: string;
    status: "pending" | "confirmed" | "completed" | "canceled";
    price?: number;
};

export type BookingResponse = {
    id: string;
    userId: string;
    serviceId: string;
    staffId: string;
    businessId: string;
    startTime: string;
    endTime: string;
    status: "pending" | "confirmed" | "completed" | "canceled";
    price?: number;
    createdAt: string;
    updatedAt: string;
};

export type Service = {
    _id: string;
    name: string;
    description?: string;
    duration: string;
    price: number;
};

export type Specialist = {
    id: string;
    name: string;
    role: string;
    availableDates: {
        date: string;
        times: string[];
    }[];
};

export type AvailableDate = {
  date: string; // Дата в формате YYYY-MM-DD
  times: string[]; // Доступные временные интервалы
};

// Ответ от API возвращает массив таких объектов:
export type AvailableDatesResponse = {
  date: string; // Дата
  availableTimes: { start: string; end: string }[]; // Временные интервалы
};
