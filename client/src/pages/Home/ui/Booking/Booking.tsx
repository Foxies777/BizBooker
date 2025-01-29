import React, { useState } from "react";
import { Button, Select, Spin, Calendar, Modal, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useServices } from "../../hooks/useService";
import { useSpecialists } from "../../hooks/useSpecialists";
import { useAvailableDates } from "../../hooks/useAvailableDates";
import { useCreateBooking } from "../../hooks/useCreateBooking";
import { useUnit } from "effector-react";
import { $user } from "../../../Profile";

const { Option } = Select;

const Booking: React.FC<{ businessId: string }> = ({ businessId }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedServiceDuration, setSelectedServiceDuration] = useState<
        number | null
    >(null); // Продолжительность услуги
    const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(
        null
    );
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const user = useUnit($user);
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

    const openModal = async () => {
        setModalOpen(true);
        setStep(0);
        await fetchServices(businessId); // Загружаем только услуги
    };
    if (!user) {
        return <div>Вы не авторизованы</div>
    }
    const closeModal = () => {
        setModalOpen(false);
        resetBooking();
    };

    const resetBooking = () => {
        setStep(0);
        setSelectedService(null);
        setSelectedServiceDuration(null); // Сброс продолжительности
        setSelectedSpecialist(null);
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const handleServiceSelect = async (serviceId: string) => {
        const service = services.find((s) => s._id === serviceId);
        setSelectedService(serviceId);
        setSelectedServiceDuration(
            service?.duration ? Number(service.duration) : null
        ); // Устанавливаем продолжительность
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
            setSelectedDate(formattedDate);
            setStep(3);
        } else {
            message.error("Эта дата недоступна для записи.");
        }
    };

    const handleTimeSelect = (time: string) => {
        console.log("Выбрано время:", time); // Лог для проверки
        setSelectedTime(time); // Сохраняем только начало времени
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
            // Логирование для диагностики
            console.log("Selected values:", {
                selectedService,
                selectedSpecialist,
                selectedDate,
                selectedTime,
            });

            const startDateTime = dayjs(
                `${selectedDate}T${selectedTime}`
            ).toISOString();
            const endDateTime = dayjs(startDateTime)
                .add(selectedServiceDuration, "minute")
                .toISOString(); // Рассчитываем `endTime`

            await createBooking({
                userId: user._id,
                businessId,
                serviceId: selectedService,
                staffId: selectedSpecialist,
                startTime: startDateTime, // Формат ISO
                endTime: endDateTime, // Формат ISO
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
    const selectedDay = availableDates.find(
        (d) => d.date === selectedDate
    )
    console.log(selectedDay?.times.map(time => time));
    
    const renderStep = () => {
        switch (step) {
            case 0:
                return servicesLoading ? (
                    <Spin />
                ) : (
                    <Select
                        placeholder="Выберите услугу"
                        style={{ width: "100%" }}
                        onChange={handleServiceSelect}
                    >
                        {services.map((service) => (
                            <Option key={service._id} value={service._id}>
                                {service.name}
                            </Option>
                        ))}
                    </Select>
                );

            case 1:
                return specialistsLoading ? (
                    <Spin />
                ) : (
                    <Select
                        placeholder="Выберите специалиста"
                        style={{ width: "100%" }}
                        onChange={handleSpecialistSelect}
                    >
                        {specialists.map((specialist) => (
                            <Option key={specialist.id} value={specialist.id}>
                                {specialist.name}
                            </Option>
                        ))}
                    </Select>
                );

            case 2:
                return datesLoading ? (
                    <Spin />
                ) : (
                    <Calendar
                        fullscreen={false}
                        disabledDate={(current) => {
                            if (!current || current < dayjs().startOf("day")) {
                                return true;
                            }
                            const formattedDate = current.format("YYYY-MM-DD");
                            return !availableDates.some(
                                (d) => d.date === formattedDate
                            );
                        }}
                        onSelect={handleDateSelect}
                    />
                );

            case 3:
                const selectedDay = availableDates.find(
                    (d) => d.date === selectedDate
                );
                return (
                    <div>
                        {selectedDay?.times.map((start) => (
                            <Button
                                key={start}
                                onClick={() =>
                                    handleTimeSelect(
                                        start
                                    )
                                }
                            >
                                {start}
                            </Button>
                        ))}
                    </div>
                )
            case 4:
                return (
                    <Button type="primary" onClick={handleBookingConfirm}>
                        Подтвердить запись
                    </Button>
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
            <Modal open={isModalOpen} footer={null} onCancel={closeModal}>
                {renderStep()}
            </Modal>
        </div>
    );
};

export default Booking;
