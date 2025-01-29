import React, { useEffect } from "react";
import { Card, List, Spin } from "antd";
import { useStaffBookings } from "../hooks/useStaffBookings";

const StaffBookings: React.FC<{ businessId: string; staffId: string }> = ({
    businessId,
    staffId,
}) => {
    const { bookings, loading, fetchBookings } = useStaffBookings();

    useEffect(() => {
        if (businessId && staffId) {
            fetchBookings(businessId, staffId);
        }
    }, [businessId, staffId]);

    if (loading) {
        return <Spin />;
    }

    if (!bookings.length) {
        return <p>Записи не найдены.</p>;
    }

    return (
        <Card title="Записи сотрудника">
            <List
                dataSource={bookings}
                renderItem={(booking) => (
                    <List.Item>
                        <List.Item.Meta
                            title={`Услуга: ${booking.serviceName}`}
                            description={`Клиент: ${booking.clientName}`}
                        />
                        <p>{`Дата: ${booking.date}`}</p>
                        <p>{`Время: ${booking.startTime} - ${booking.endTime}`}</p>
                        <p>{`Длительность: ${booking.serviceDuration} мин.`}</p>
                        <p>{`Цена: ${booking.servicePrice}₽`}</p>
                        <p>{`Статус: ${booking.status}`}</p>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default StaffBookings;
