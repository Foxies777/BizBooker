import { useUnit } from "effector-react";
import { $staffDetails, fetchStaffDetailsFx } from "../../../shared/staff";
import { useEffect } from "react";
import { $user } from "../../Profile";

export const useStaffDetails = (businessId: string) => {
    const [details, loading] = useUnit([
        $staffDetails,
        fetchStaffDetailsFx.pending,
    ]);
    const user = useUnit($user)
    useEffect(() => {
        if(user){
            fetchStaffDetailsFx({ businessId, staffId: user._id });
        }

    }, [businessId, user]);

    return [details, loading] as const;
};
