import { useUnit } from "effector-react";
import { $staffDetails, fetchStaffDetailsFx } from "../../../shared/staff";
import { useEffect } from "react";
import { $user } from "../../Profile";
import { $currentBusiness } from "../../Business/Staff";

export const useStaffDetails = () => {
    const [details,  loading] = useUnit([
        $staffDetails,
        fetchStaffDetailsFx.pending,
    ]);
    const business = useUnit($currentBusiness)
    console.log(business);
    
    const user = useUnit($user)
    useEffect(() => {
        if(user && business){
            fetchStaffDetailsFx({ businessId: business.businessId._id, staffId: user._id });
        }

    }, [business, user]);

    return [details, loading] as const;
};
