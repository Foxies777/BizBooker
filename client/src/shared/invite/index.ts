import { createEffect, restore } from "effector";
import {
    getUserInvitations,
    sendCode,
    sendInvitation,
    verifyCode,
} from "../api/invite";
import {
    SendInvitationRequest,
    VerifyCodeRequest,
    VerifyInvitationResponse,
} from "../api/invite/model";
import { tokenExprired } from "../auth";

export const sendInvitationFx = createEffect(
    async (data: SendInvitationRequest) => {
        await sendInvitation(data);
    }
);

export const verifyCodeFx = createEffect(
    async (data: VerifyCodeRequest): Promise<VerifyInvitationResponse> => {
        return verifyCode(data);
    }
);

export const sendCodeFx = createEffect(async (data: { userId: string }) => {
    return await sendCode(data);
});
export const getInvitesFx = createEffect(async (userId: string) => {
    const response = await getUserInvitations(userId);
    return response;
});
export const $invites = restore(getInvitesFx.doneData, []).reset(tokenExprired);
