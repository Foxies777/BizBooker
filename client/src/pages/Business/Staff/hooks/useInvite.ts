import { useUnit } from "effector-react";
import { sendInvitationFx } from "../../../../shared/invite";

export const useSendInvitation = () => {
    const [sendInvitation, loading] = useUnit([sendInvitationFx, sendInvitationFx.pending]);
    return { sendInvitation, loading };
};
