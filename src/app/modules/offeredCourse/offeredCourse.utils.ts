import { TSchedule } from './offeredCourse.interface';

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedules: TSchedule,
) => {
  for (const schedules of assignedSchedules) {
    const exisitingStartTime = new Date(`1970-01-01T${schedules.startTime}`);
    const exisitingEndTime = new Date(`1970-01-01T${schedules.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedules.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedules.endTime}`);

    if (newStartTime < exisitingEndTime && newEndTime > exisitingStartTime) {
      return true;
    }
  }
  return false;
};
