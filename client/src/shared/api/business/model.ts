export type Business = {
    _id: string;
    name: string;
    description: string;
    category: string;
    address: string;
    phone: string;
    email: string;
    createdAt: string;
};

export type CreateBusinessRequest = {
    name: string;
    description: string;
    category: string;
    address: string;
    phone: string;
    email: string;
    userId: string;
};

export type CreateCategory = {
    name: string;
};

export type Category = {
    _id: string;
    name: string;
    createdAt: string;
};
