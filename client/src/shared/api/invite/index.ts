import { api } from "../api";
import { Invitations, SendInvitationRequest, VerifyCodeRequest, VerifyInvitationResponse } from "./model";

export const sendInvitation = async (data: SendInvitationRequest) => {
    console.log(data);
    
    return api.post("invite/send", {
        json: data,
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const verifyCode = async (data: VerifyCodeRequest): Promise<VerifyInvitationResponse> => {
    console.log(data);
    
    const response = await api.post("invite/verify", {
        json: data,
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
};

export const sendCode = async (data: { userId: string }) => {
    return api.post("invite/accept", {
        json: data, 
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getUserInvitations = async (userId:string) =>{
    try {       
        const response = await api.get(`invite/user/${userId}`).json<Invitations[]>()
        console.log('fffff', response);
        
        return response
    } catch (error) {
        console.error("Error in getUserInvitations:", error)
        throw new Error("Failed to get user invitations")
    }
}