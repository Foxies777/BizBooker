import React, { useEffect } from "react";
import { Card, List, Spin, Button } from "antd";
import { useStaffBookings } from "../hooks/useStaffBookings";
import dayjs, { Dayjs } from "dayjs";
import { useUnit } from "effector-react";
import { updateBookingStatusFx } from "../../../shared/staff";

const StaffBookings: React.FC<{
    businessId: string;
    staffId: string;
    selectedDate: Dayjs | null;
    setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}> = ({ businessId, staffId, selectedDate, setSelectedDate }) => {
    const { bookings, loading, fetchBookings } = useStaffBookings();
    const updateStatus = useUnit(updateBookingStatusFx);

    useEffect(() => {
        if (businessId && staffId) {
            fetchBookings(businessId, staffId);
        }
    }, [businessId, staffId]);

    if (loading) {
        return <Spin />;
    }

    const filteredBookings = selectedDate
        ? bookings.filter((booking) => {
              const bookingDate = dayjs(booking.date, "DD.MM.YYYY"); 
              return (
                  bookingDate.isValid() &&
                  bookingDate.isSame(selectedDate, "day")
              );
          })
        : bookings;

    const resetFilteredBookings = () => setSelectedDate(null);
    const handleClientStatus = async (
        bookingId: string,
        status: "completed" | "canceled"
    ) => {
        console.log(`Обновление статуса: ${status}, запись ID: ${bookingId}`);
        await updateStatus({ bookingId, status });
    };
    if (!filteredBookings.length) {
        return (
            <div className="no-bookings">
                <p>Записей на выбранную дату нет.</p>
                <Button onClick={resetFilteredBookings}>
                    Показать все записи
                </Button>
            </div>
        );
    }

    return (
        <div className="bookings-container">
        <Card title="Записи сотрудника">
            <List
                dataSource={filteredBookings}
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

                        {booking.status === "Ожидает" && (
                            <>
                                <Button type="primary" onClick={() => handleClientStatus(booking._id, "completed")}>
                                    Клиент пришёл
                                </Button>
                                <Button type="default" danger onClick={() => handleClientStatus(booking._id, "canceled")}>
                                    Клиент не пришёл
                                </Button>
                            </>
                        )}
                    </List.Item>
                )}
            />
        </Card>
    </div>
    );
};

export default StaffBookings;
