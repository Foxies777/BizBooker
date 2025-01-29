import { useUnit } from "effector-react";
import { $services, fetchServicesFx } from "../../../shared/booking";

export const useServices = () => {
  const [services, loading] = useUnit([$services, fetchServicesFx.pending]);
  return { services, fetchServices: fetchServicesFx, loading };
};
