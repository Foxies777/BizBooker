import { useState } from "react";
import { useStaffDetails } from "../hooks/useStaffDetails";
import { Spin, Card, List, Calendar, message, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Navbar } from "../../Business";
import StaffEarnings from "./StaffEarnings"; // ✅ Импортируем компонент
import { useUnit } from "effector-react";
import { $user } from "../../Profile";
import "../styles/StaffPage.css";
import StaffBooking from "./StaffBooking";

const { Option } = Select;

const StaffPage = () => {
    const [details, loading] = useStaffDetails();
    const user = useUnit($user);

    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());

    if (loading) {
        return <Spin />;
    }

    if (!details) {
        return <p>Данные не найдены.</p>;
    }

    const { business, services, schedule } = details;

    const startDate = schedule?.startDate ? dayjs(schedule.startDate) : dayjs();
    const endDate = schedule?.endDate ? dayjs(schedule.endDate) : null;

    const daysOff = schedule?.daysOff || [];

    const handleDateSelect = (date: Dayjs) => {
        if (daysOff.includes(date.format("dddd"))) {
            message.error("В этот день сотрудник не работает");
            return;
        }
        setSelectedDate(date);
        message.info(`Вы выбрали дату: ${date.format("DD.MM.YYYY")}`);
    };

    const handleMonthChange = (month: number) => {
        setCurrentMonth((prev) => prev.month(month));
    };

    const handleYearChange = (year: number) => {
        setCurrentMonth((prev) => prev.year(year));
    };

    return (
        <div className="staff-page">
            <Navbar />
            <h1 className="business-title">{`Бизнес: ${business.name}`}</h1>

            <div className="content-container">
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

                <Card title="Календарь" className="calendar-card">
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <Select
                            value={currentMonth.month()}
                            onChange={handleMonthChange}
                            style={{ width: 120 }}
                        >
                            {Array.from({ length: 12 }, (_, i) => (
                                <Option key={i} value={i}>
                                    {dayjs().month(i).format("MMMM")}
                                </Option>
                            ))}
                        </Select>

                        <Select
                            value={currentMonth.year()}
                            onChange={handleYearChange}
                            style={{ width: 100 }}
                        >
                            {Array.from({ length: 5 }, (_, i) => {
                                const year = dayjs().year() - 2 + i;
                                return (
                                    <Option key={year} value={year}>
                                        {year}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>

                    <Calendar
                        fullscreen={false}
                        onSelect={handleDateSelect}
                        value={selectedDate}
                    />
                </Card>

                {/* ✅ Вставляем компонент заработка */}
                {business._id && user?._id && selectedDate && (
                    <StaffEarnings
                        businessId={business._id}
                        staffId={user._id}
                        selectedDate={selectedDate}
                    />
                )}

                {business._id && user?._id && (
                    <StaffBooking
                        businessId={business._id}
                        staffId={user._id}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                )}
            </div>
        </div>
    );
};

export default StaffPage;
