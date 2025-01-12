import { useUnit } from "effector-react";
import { updateToStaff } from "../types/model";

export const useCreateStaff = () => {
  const updateUserRole = useUnit(updateToStaff);
  const handleUpdateStaff = (userId: string, role: string) => {
    updateUserRole({ userId: userId, role });
  };
  return [handleUpdateStaff] as const;
}
