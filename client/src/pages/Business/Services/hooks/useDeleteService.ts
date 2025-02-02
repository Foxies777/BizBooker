import { deleteServiceFx } from "../../../../shared/service";

export const useDeleteService = () => {
    return {
        deleteService: deleteServiceFx,
        loading: deleteServiceFx.pending,
    }
}