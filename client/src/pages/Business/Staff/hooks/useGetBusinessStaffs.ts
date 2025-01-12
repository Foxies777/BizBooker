import { useUnit } from "effector-react";
import { useEffect } from "react";
import { $activeStaff, $pendingStaff, fetchBusinessStaffFx } from "../../../../shared/staff";
import { $currentBusiness } from "../../../../shared/business";

export const useGetBusinessStaffs = () => {
    const [pendingStaff, activeStaff, business, loading] = useUnit([
        $pendingStaff,
        $activeStaff,
        $currentBusiness,
        fetchBusinessStaffFx.pending,
    ]);

    useEffect(() => {
        
        if (business?._id) {
            
            fetchBusinessStaffFx(business._id); 
        }
    }, [business?._id]);

    return [pendingStaff, activeStaff, loading] as const;
};
