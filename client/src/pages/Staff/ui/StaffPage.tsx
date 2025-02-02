import { useState } from "react";
import { useStaffDetails } from "../hooks/useStaffDetails";
import { Spin, Card, List, Calendar, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Navbar } from "../../Business";
import StaffBookings from "./StaffBooking";
import { useUnit } from "effector-react";
import { $user } from "../../Profile";
import "../styles/StaffPage.css"; // Импортируем стили

const StaffPage = () => {
    const businessData = localStorage.getItem("currentBusiness");
    const businessId = businessData ? JSON.parse(businessData).businessId._id : null;
    const user = useUnit($user);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [details, loading] = useStaffDetails(businessId);

    if (loading && !user) {
        return <Spin />;
    }

    if (!details) {
        return <p>Данные не найдены.</p>;
    }

    const { business, services, schedule } = details;

    // Обработчик выбора даты в календаре
    const handleDateSelect = (date: Dayjs) => {
        setSelectedDate(date);
        message.info(`Вы выбрали дату: ${date.format("DD.MM.YYYY")}`);
        // Здесь можно добавить запрос на сервер для получения данных на выбранную дату
    };

    return (
        <div className="staff-page">
            <Navbar />
            <h1 className="business-title">{`Бизнес: ${business.name}`}</h1>

            <div className="content-container">
                {/* Услуги */}
                <Card title="Услуги" className="services-card">
                    <List
                        dataSource={services}
                        renderItem={(service) => (
                            <List.Item className="service-item">
                                <List.Item.Meta
                                    title={service.name}
                                    description={service.description}
                                />
                            </List.Item>
                        )}
                    />
                </Card>

                {/* Календарь */}
                <Card title="Календарь" className="calendar-card">
                    <Calendar
                        fullscreen={false}
                        onSelect={handleDateSelect}
                        value={selectedDate || dayjs()}
                        disabledDate={(current) => {
                            // Отключаем даты, которые меньше текущей
                            return current && current < dayjs().startOf("day");
                        }}
                    />
                </Card>

                {/* Расписание */}
                <Card title="Расписание" className="schedule-card">
                    <p>{`Тип: ${schedule?.scheduleType}`}</p>
                    <p>
                        {`Даты: ${dayjs(schedule?.startDate).format("DD.MM.YYYY")} - ${dayjs(
                            schedule?.endDate
                        ).format("DD.MM.YYYY")}`}
                    </p>
                    <p>{`Выходные: ${schedule?.daysOff?.join(", ") || "Нет"}`}</p>
                    <List
                        dataSource={schedule?.workHours}
                        renderItem={(hour) => (
                            <List.Item className="work-hour-item">
                                <p>{`Рабочие часы: ${hour.startTime} - ${hour.endTime}`}</p>
                                {hour.breaks.map((br, index) => (
                                    <p key={index}>
                                        {`Перерыв: ${br.startBreak} - ${br.endBreak}`}
                                    </p>
                                ))}
                            </List.Item>
                        )}
                    />
                </Card>
            </div>

            {/* Бронирования */}
            {businessId && user?._id && (
                <StaffBookings businessId={businessId} staffId={user._id} />
            )}
        </div>
    );
};

export default StaffPage;