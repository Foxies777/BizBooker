import React, { useEffect } from "react";
import { Card, Spin } from "antd";
import { useStaffEarnings } from "../hooks/useStaffEarnings";
import dayjs, { Dayjs } from "dayjs";

const StaffEarnings: React.FC<{ businessId: string; staffId: string; selectedDate: Dayjs | null }> = ({
    businessId,
    staffId,
    selectedDate,
}) => {
    const { earnings, isLoading } = useStaffEarnings(businessId, staffId, selectedDate ?? dayjs());

    if (isLoading) {
        return <Spin />;
    }

    if (!selectedDate) {
        return <p>Выберите дату для отображения заработка.</p>;
    }
    console.log(earnings);
    
    return (
        <Card title="Заработок">
            <p>{`Заработок за день (${selectedDate.format("DD.MM.YYYY")}): ${earnings?.dailyEarnings || 0} ₽`}</p>
            <p>{`Заработок за месяц (${selectedDate.format("MMMM YYYY")}): ${earnings?.monthlyEarnings || 0} ₽`}</p>
        </Card>
    );
};

export default StaffEarnings;

