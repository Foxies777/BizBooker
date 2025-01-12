export type SendInvitationRequest = {
    email?: string;
    phone?: string;
    businessId: string;
};

export type VerifyCodeRequest = {
    userId: string;
    code: string;
    businessId: string;
};

export type VerifyInvitationResponse = {
    message: string;
};
export type Invitations = {
    _id: string;
    businessId: {
        _id: string;
        name: string;
    };
    status: string;
    userId: string
};
