import { useUnit } from 'effector-react';
import { createScheduleFx } from '../types/model';
import { CreateScheduleRequest } from '../../../../shared/api/schedule/model';

export const useCreateSchedule = () => {
  const loading = useUnit(createScheduleFx.pending);

  const handleCreateSchedule = async (data: CreateScheduleRequest) => {
    await createScheduleFx(data);
  };

  return { handleCreateSchedule, loading };
};
