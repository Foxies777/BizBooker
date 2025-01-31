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
    const [selectedServiceDuration, setSelectedServiceDuration] = useState<number | null>(null);
    const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs()); // Храним выбранный месяц

    const user = useUnit($user);
    const { services, fetchServices, loading: servicesLoading } = useServices();
    const { specialists, fetchSpecialists, loading: specialistsLoading } = useSpecialists();
    const { availableDates, fetchAvailableDates, loading: datesLoading } = useAvailableDates();
    const [bookingStatus, createBooking] = useCreateBooking();

    const openModal = async () => {
        setModalOpen(true);
        setStep(0);
        await fetchServices(businessId);
    };

    if (!user) {
        return <div>Вы не авторизованы</div>;
    }

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
        setCurrentMonth(dayjs());
    };

    const handleServiceSelect = async (serviceId: string) => {
        const service = services.find((s) => s._id === serviceId);
        setSelectedService(serviceId);
        setSelectedServiceDuration(service?.duration ? Number(service.duration) : null);
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
        const isDateAvailable = availableDates.some((d) => d.date === formattedDate);

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
        if (!selectedService || !selectedSpecialist || !selectedDate || !selectedTime || !selectedServiceDuration) {
            message.error("Заполните все поля для завершения записи.");
            return;
        }

        try {
            const startDateTime = selectedDate.hour(parseInt(selectedTime.split(":")[0])).minute(parseInt(selectedTime.split(":")[1])).toISOString();
            const endDateTime = dayjs(startDateTime).add(selectedServiceDuration, "minute").toISOString();

            await createBooking({
                userId: user._id,
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
                    <div>
                        <Calendar
                            fullscreen={false}
                            disabledDate={(current) => {
                                if (!current || current < dayjs().startOf("day")) {
                                    return true;
                                }
                                const formattedDate = current.format("YYYY-MM-DD");
                                return !availableDates.some((d) => d.date === formattedDate);
                            }}
                            onSelect={handleDateSelect}
                            onPanelChange={handleCalendarPanelChange}
                            value={selectedDate || currentMonth}
                        />
                        <Button type="primary" onClick={handleConfirmDate} disabled={!selectedDate}>
                            Подтвердить дату
                        </Button>
                    </div>
                );

            case 3:
                const selectedDay = availableDates.find((d) => d.date === selectedDate?.format("YYYY-MM-DD"));
                return (
                    <div>
                        {selectedDay?.times.map((start) => (
                            <Button key={start} onClick={() => handleTimeSelect(start)}>
                                {start}
                            </Button>
                        ))}
                    </div>
                );

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
