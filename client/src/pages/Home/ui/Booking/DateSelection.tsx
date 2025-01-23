import React from "react";
import { Calendar, Button } from "antd";
import type { Dayjs } from "dayjs";

interface DateSelectionProps {
    selectedDate: string | null;
    availableDates: { date: string; times: string[] }[];
    onSelectDate: (date: Dayjs) => void;
    onSelectTime: (time: string) => void;
}

const DateSelection: React.FC<DateSelectionProps> = ({
    selectedDate,
    availableDates,
    onSelectDate,
    onSelectTime,
}) => {
    const disabledDate = (current: Dayjs) => {
        const formattedDate = current.format("YYYY-MM-DD");
        return !availableDates.some((d) => d.date === formattedDate);
    };

    const timesForSelectedDate =
        availableDates.find((d) => d.date === selectedDate)?.times || [];
    
    return (
        <div>
            <Calendar
                fullscreen={false}
                disabledDate={disabledDate}
                onSelect={onSelectDate}
            />
            {selectedDate && (
                <div>
                    <h3>Доступное время:</h3>
                    {timesForSelectedDate.map((time) => (
                        <Button key={time} onClick={() => onSelectTime(time)}>
                            {time}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DateSelection;
