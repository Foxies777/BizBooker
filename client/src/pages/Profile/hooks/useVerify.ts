import { useUnit } from "effector-react";
import { verifyCodeFx } from "../../../shared/invite";

export const useVerifyCode = () => {
    const [verifyCode, loading] = useUnit([verifyCodeFx, verifyCodeFx.pending]);
    return { verifyCode, loading };
};
