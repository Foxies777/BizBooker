import { useUnit } from "effector-react";
import { updateServiceFx } from "../../../../shared/service";

export const useUpdateService = () => {
    const updateService = useUnit(updateServiceFx);

    return { updateService };
};
