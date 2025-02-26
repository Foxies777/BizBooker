export type CreateServiceRequest = {
    name: string;
    description: string;
    duration: Number;
    price: Number;
    businessId: string;
};
export type Service = {
    _id: string;
    name: string;
    description: string;
    duration: string;
    price: string;
};
export type UpdateServiceRequest = {
    name?: string;
    description?: string;
    duration?: string;
    price?: string;
};

export type DeleteServiceRequest = {
    serviceId: string;
};
