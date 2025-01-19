import { createEffect, createEvent, restore, sample } from 'effector';
import { createSchedule, getStaffSchedules } from '../../../../shared/api/schedule';
import { CreateScheduleRequest, StaffScheduleResponse } from '../../../../shared/api/schedule/model';

// Effects
export const createScheduleFx = createEffect(async (data: CreateScheduleRequest) => {
  return await createSchedule(data);
});

export const getStaffSchedulesFx = createEffect(async ({ staffId, businessId }: { staffId: string; businessId: string }) => {
  return await getStaffSchedules(staffId, businessId);
});

// Event to fetch schedules
export const fetchSchedules = createEvent<{ staffId: string; businessId: string }>();

// Store for fetched schedules
export const $staffSchedules = restore<StaffScheduleResponse[]>(getStaffSchedulesFx.doneData, [])

sample({
  clock: fetchSchedules,
  target: getStaffSchedulesFx,
});
