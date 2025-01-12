import { useUnit } from "effector-react";
import { $invites, getInvitesFx } from "../../../shared/invite";
import { useEffect } from "react";
import { $user } from "../types/model";

export const useGetInvites = () => {
    const [invites, invitesLoading, user] = useUnit([$invites, getInvitesFx.pending, $user])

    useEffect(() => {
        if (user) {
          getInvitesFx(user._id)
        }
      }, [user])
    return [invites, invitesLoading ] as const;
};
