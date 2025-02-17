import React, { useEffect } from "react";
import { List, Spin, Card, Button, message } from "antd";
import { useUserBookings } from "../hooks/useUserBookings";
import { useProfile } from "../../../context/ProfileContext";
import { useUnit } from "effector-react";
import "../styles/Profile.css";
import { cancelBookingFx, removeBooking } from "../../../shared/user";

const UserBookings: React.FC = () => {
    const { user } = useProfile();
    const { bookings, fetchBookings, loading } = useUserBookings();
    const cancelBooking = useUnit(cancelBookingFx);
    const removeBookingFromList = useUnit(removeBooking);

    useEffect(() => {
        if (user?._id) {
            fetchBookings(user._id);
        }
    }, [user]);

    if (loading)
        return (
            <div className="spin-container">
                <Spin size="large" />
            </div>
        );

    if (!bookings.length) return <p className="no-data">Нет записей.</p>;
        console.log(bookings);
        
    const handleCancelBooking = async (bookingId: string) => {
        try {
            console.log(bookingId);
            
            await cancelBooking({ userId: user?._id ?? "", bookingId });
            message.success("Запись успешно отменена.");
            removeBookingFromList(bookingId);
        } catch (error) {
            message.error("Ошибка при отмене записи.");
        }
    };

    return (
        <Card title="Ваши записи" className="profile-bookings-card">
            <List
                dataSource={[...bookings].reverse()}
                renderItem={(booking) => (
                    <List.Item className="booking-item">
                        <List.Item.Meta
                            title={`${booking.serviceName} (${booking.businessName})`}
                            description={`Дата: ${booking.date} | Время: ${booking.startTime} - ${booking.endTime}`}
                        />
                        <p>{`Сотрудник: ${booking.staffName} | Цена: ${booking.servicePrice}₽ | Статус: ${booking.status}`}</p>

                        {booking.status === "Ожидает" && (
                            <Button
                                type="primary"
                                danger
                                onClick={() => handleCancelBooking(booking.bookingId)}
                            >
                                Отменить запись
                            </Button>
                        )}
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default UserBookings;
