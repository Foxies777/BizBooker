import { useUnit } from "effector-react";
import { $availableDates, fetchAvailableDatesFx } from "../../../shared/booking";

export const useAvailableDates = () => {
  const [availableDates, loading] = useUnit([
    $availableDates,
    fetchAvailableDatesFx.pending,
  ]);
  return { availableDates, fetchAvailableDates: fetchAvailableDatesFx, loading };
};
