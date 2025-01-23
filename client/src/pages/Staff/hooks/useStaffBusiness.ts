import { useUnit } from "effector-react";
import { $staffBusinesses, fetchStaffBusinessFx } from "../../../shared/staff";

import { useEffect } from "react";
import { $user } from "../../Profile";

export const useStaffBusiness = () => {
    const [staffBusiness, loading] = useUnit([
        $staffBusinesses,
        fetchStaffBusinessFx.pending,
    ]);
    const user = useUnit($user);
    useEffect(() => {
        if (user) {
            fetchStaffBusinessFx(user._id);
        }
    }, [user]);
    return [staffBusiness, loading] as const;
};
