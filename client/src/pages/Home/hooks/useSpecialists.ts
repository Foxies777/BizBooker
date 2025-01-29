import { useUnit } from "effector-react";
import { $specialists, fetchSpecialistsFx } from "../../../shared/booking";

export const useSpecialists = () => {
  const [specialists, loading] = useUnit([
    $specialists,
    fetchSpecialistsFx.pending,
  ]);
  return { specialists, fetchSpecialists: fetchSpecialistsFx, loading };
};
