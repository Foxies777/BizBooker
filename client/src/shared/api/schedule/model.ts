export type CreateScheduleRequest = {
    scheduleType: 'temporary' | 'permanent' | 'recurring'
    startDate?: string
    endDate?: string
    daysOff?: string[]
    workHours: {
        startTime: string
        endTime: string
    }
    breaks: {
        workHourStartTime: string
        workHourEndTime: string
        startBreak: string
        endBreak: string
    }[]
    staffId: string
    businessId: string
}

export type Schedule = {
    _id: string
    scheduleType: 'temporary' | 'permanent' | 'recurring'
    startDate?: string
    endDate?: string
    daysOff?: string[]
    createdAt: string
}
