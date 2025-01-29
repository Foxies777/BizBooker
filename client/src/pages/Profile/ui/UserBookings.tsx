import React, { useEffect } from "react";
import { List, Spin, Card } from "antd";
import { useUserBookings } from "../hooks/useUserBookings";
import { useProfile } from "../../../context/ProfileContext";

const UserBookings: React.FC = () => {
    const { user } = useProfile();
    const { bookings, fetchBookings, loading } = useUserBookings();

    useEffect(() => {
        if (user?._id) {
            fetchBookings(user._id);
        }
    }, [user]);

    if (loading) return <Spin />;
    if (!bookings.length) return <p>Нет записей.</p>;

    return (
        <Card title="Ваши записи">
            <List
                dataSource={bookings}
                renderItem={(booking) => (
                    <List.Item>
                        <List.Item.Meta
                            title={`${booking.serviceName} (${booking.businessName})`}
                            description={`Дата: ${booking.date} | Время: ${booking.startTime} - ${booking.endTime}`}
                        />
                        <p>{`Сотрудник: ${booking.staffName} | Цена: ${booking.servicePrice}₽ | Статус: ${booking.status}`}</p>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default UserBookings;
