import React, { useState } from "react";
import { Button, Spin, Calendar, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useServices } from "../../hooks/useService";
import { useSpecialists } from "../../hooks/useSpecialists";
import { useAvailableDates } from "../../hooks/useAvailableDates";
import { useCreateBooking } from "../../hooks/useCreateBooking";
import { useUnit } from "effector-react";
import { $user } from "../../../Profile";
import "../../styles/Booking.css"; // Импортируем стили
import { modalClosed } from "../../../../shared/booking";
import { $isAuth } from "../../../../shared/auth";

const Booking: React.FC<{ businessId: string }> = ({ businessId }) => {
    const [user, isAuth] = useUnit([$user, $isAuth]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedServiceDuration, setSelectedServiceDuration] = useState<
        number | null
    >(null);
    const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(
        null
    );
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
    const { services, fetchServices, loading: servicesLoading } = useServices();
    const {
        specialists,
        fetchSpecialists,
        loading: specialistsLoading,
    } = useSpecialists();
    const {
        availableDates,
        fetchAvailableDates,
        loading: datesLoading,
    } = useAvailableDates();
    const [bookingStatus, createBooking] = useCreateBooking();
    if (!isAuth) {
        return <div>Вы не авторизованы</div>;
    }
    const openModal = async () => {
        setModalOpen(true);
        setStep(0);
        await fetchServices(businessId);
    };

    const closeModal = () => {
        setModalOpen(false);
        resetBooking();
    };

    const resetBooking = () => {
        setStep(0);
        setSelectedService(null);
        setSelectedServiceDuration(null);
        setSelectedSpecialist(null);
        setSelectedDate(null);
        setSelectedTime(null);
        modalClosed();
        setCurrentMonth(dayjs());
    };

    const handleServiceSelect = async (serviceId: string) => {
        const service = services.find((s) => s._id === serviceId);
        setSelectedService(serviceId);
        setSelectedServiceDuration(
            service?.duration ? Number(service.duration) : null
        );
        setStep(1);
        await fetchSpecialists({ serviceId, businessId });
    };

    const handleSpecialistSelect = async (specialistId: string) => {
        setSelectedSpecialist(specialistId);
        setStep(2);
        await fetchAvailableDates({
            serviceId: selectedService!,
            staffId: specialistId,
        });
    };

    const handleDateSelect = (date: Dayjs) => {
        const formattedDate = date.format("YYYY-MM-DD");
        const isDateAvailable = availableDates.some(
            (d) => d.date === formattedDate
        );

        if (isDateAvailable) {
            setSelectedDate(date);
        } else {
            message.error("Эта дата недоступна для записи.");
        }
    };

    const handleConfirmDate = () => {
        if (selectedDate) {
            setStep(3);
        } else {
            message.error("Выберите доступную дату.");
        }
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setStep(4);
    };

    const handleBookingConfirm = async () => {
        if (
            !selectedService ||
            !selectedSpecialist ||
            !selectedDate ||
            !selectedTime ||
            !selectedServiceDuration
        ) {
            message.error("Заполните все поля для завершения записи.");
            return;
        }

        try {
            const startDateTime = selectedDate
                .hour(parseInt(selectedTime.split(":")[0]))
                .minute(parseInt(selectedTime.split(":")[1]))
                .toISOString();
            const endDateTime = dayjs(startDateTime)
                .add(selectedServiceDuration, "minute")
                .toISOString();

            await createBooking({
                userId: user?._id || "",
                businessId,
                serviceId: selectedService,
                staffId: selectedSpecialist,
                startTime: startDateTime,
                endTime: endDateTime,
                status: "pending",
                price: 0,
            });

            message.success("Запись успешно создана!");
            closeModal();
        } catch (error) {
            console.error("Ошибка при создании записи:", error);
            message.error("Ошибка при создании записи.");
        }
    };

    const handleCalendarPanelChange = (date: Dayjs) => {
        setCurrentMonth(date);
    };

    const goBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return servicesLoading ? (
                    <Spin />
                ) : (
                    <div className="booking-step">
                        <h3>Выберите услугу</h3>
                        {services.length > 0 ? (
                            services.map((service) => (
                                <div
                                    key={service._id}
                                    className={`service-card ${
                                        selectedService === service._id
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleServiceSelect(service._id)
                                    }
                                >
                                    {service.name}
                                </div>
                            ))
                        ) : (
                            <p>На данный момент нету услуг, зайдите позже</p>
                        )}
                    </div>
                );

            case 1:
                return specialistsLoading ? (
                    <Spin />
                ) : (
                    <div className="booking-step">
                        <h3>Выберите специалиста</h3>
                        {specialists.map((specialist) => (
                            <div
                                key={specialist.id}
                                className={`specialist-card ${
                                    selectedSpecialist === specialist.id
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleSpecialistSelect(specialist.id)
                                }
                            >
                                {specialist.name}
                            </div>
                        ))}
                    </div>
                );

            case 2:
                return datesLoading ? (
                    <Spin />
                ) : (
                    <div className="booking-step">
                        <h3>Выберите дату</h3>
                        <div className="calendar-container">
                            <Calendar
                                fullscreen={false}
                                disabledDate={(current) => {
                                    if (
                                        !current ||
                                        current < dayjs().startOf("day")
                                    ) {
                                        return true;
                                    }
                                    const formattedDate =
                                        current.format("YYYY-MM-DD");
                                    return !availableDates.some(
                                        (d) => d.date === formattedDate
                                    );
                                }}
                                onSelect={handleDateSelect}
                                onPanelChange={handleCalendarPanelChange}
                                value={selectedDate || currentMonth}
                            />
                        </div>
                        <div className="navigation-buttons">
                            <button onClick={goBack}>Назад</button>
                            <button
                                className="primary"
                                onClick={handleConfirmDate}
                                disabled={!selectedDate}
                            >
                                Подтвердить дату
                            </button>
                        </div>
                    </div>
                );

            case 3:
                const selectedDay = availableDates.find(
                    (d) => d.date === selectedDate?.format("YYYY-MM-DD")
                );
                return (
                    <div className="booking-step">
                        <h3>Выберите время</h3>
                        <div className="time-slots">
                            {selectedDay?.times.map((start) => (
                                <div
                                    key={start}
                                    className={`time-slot ${
                                        selectedTime === start ? "selected" : ""
                                    }`}
                                    onClick={() => handleTimeSelect(start)}
                                >
                                    {start}
                                </div>
                            ))}
                        </div>
                        <div className="navigation-buttons">
                            <button onClick={goBack}>Назад</button>
                            <button
                                className="primary"
                                onClick={() => setStep(4)}
                                disabled={!selectedTime}
                            >
                                Далее
                            </button>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="booking-step">
                        <h3>Подтвердите запись</h3>

                        {/* Отображение выбранных данных */}
                        <div className="selected-info">
                            <div className="info-item">
                                <span className="info-label">Услуга:</span>
                                <span className="info-value">
                                    {
                                        services.find(
                                            (s) => s._id === selectedService
                                        )?.name
                                    }
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Сотрудник:</span>
                                <span className="info-value">
                                    {
                                        specialists.find(
                                            (s) => s.id === selectedSpecialist
                                        )?.name
                                    }
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Дата:</span>
                                <span className="info-value">
                                    {selectedDate?.format("DD.MM.YYYY")}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Время:</span>
                                <span className="info-value">
                                    {selectedTime}
                                </span>
                            </div>
                        </div>

                        <div className="navigation-buttons">
                            <button onClick={goBack}>Назад</button>
                            <button
                                className="primary"
                                onClick={handleBookingConfirm}
                            >
                                Подтвердить запись
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div>
            <Button type="primary" onClick={openModal}>
                Записаться
            </Button>
            <div
                className={`overlay ${isModalOpen ? "open" : ""}`}
                onClick={closeModal}
            />
            <div className={`booking-widget ${isModalOpen ? "open" : ""}`}>
                <div className="booking-header">
                    <h2>Запись</h2>
                    <button onClick={closeModal}>×</button>
                </div>
                {renderStep()}
            </div>
        </div>
    );
};

export default Booking;
