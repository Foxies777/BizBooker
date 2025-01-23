import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import type { Dayjs } from "dayjs";
import SpecialistSelection from "./Booking/SpecialistSelection";
import ServiceSelection from "./Booking/ServiceSelection";
import DateSelection from "./Booking/DateSelection";
import BookingSummary from "./Booking/BookingSummary";

const specialists = [
    {
        id: 1,
        name: "Алия",
        role: "Топ-барбер",
        availableDates: [
            { date: "2025-01-25", times: ["10:45", "11:00", "14:45"] },
            { date: "2025-01-26", times: ["11:15", "15:30"] },
        ],
        services: ["Стрижка", "Бритьё"],
    },
    {
        id: 2,
        name: "Амир",
        role: "Шеф-мастер",
        availableDates: [
            { date: "2025-01-25", times: ["13:15", "19:15"] },
            { date: "2025-01-27", times: ["12:00", "16:00"] },
        ],
        services: ["Массаж", "Маникюр"],
    },
    {
        id: 3,
        name: "Ирина",
        role: "Стилист",
        availableDates: [
            { date: "2025-01-28", times: ["10:00", "11:30", "14:00"] },
            { date: "2025-01-29", times: ["09:00", "13:00", "17:00"] },
        ],
        services: ["Укладка", "Окрашивание"],
    },
];

const services = [
    { id: 1, name: "Стрижка", duration: "30 мин" },
    { id: 2, name: "Бритьё", duration: "20 мин" },
    { id: 3, name: "Массаж", duration: "1 час" },
    { id: 4, name: "Маникюр", duration: "45 мин" },
    { id: 5, name: "Укладка", duration: "40 мин" },
    { id: 6, name: "Окрашивание", duration: "2 часа" },
];

const Business: React.FC = () => {
    const [step, setStep] = useState(0);
    const [selectedSpecialist, setSelectedSpecialist] = useState<any | null>(null);
    const [selectedService, setSelectedService] = useState<any | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectionPath, setSelectionPath] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
  
    const handleSpecialistSelect = (id: number) => {
      const specialist = specialists.find((s) => s.id === id);
      if (specialist) {
        setSelectedSpecialist(specialist);
        setStep(2); // Go to service selection
      }
    };
  
    const handleServiceSelect = (id: number) => {
      const service = services.find((s) => s.id === id);
      if (service) {
        console.log(service);
        setSelectedService(service);
        setStep(3); // Go to date selection
      }
    };
  
    const handleDateSelect = (date: Dayjs) => {
      const selectedDateString = date.format("YYYY-MM-DD");
      const availableTimes = selectedSpecialist?.availableDates.find((d:any) => d.date === selectedDateString)?.times;
  
      if (availableTimes && availableTimes.length > 0) {
        setSelectedDate(selectedDateString);
        setStep(4); // Proceed to time selection
      } else {
        message.error("Нет доступного времени на выбранную дату.");
      }
    };
  
    const handleTimeSelect = (time: string) => {
      setSelectedTime(time);
      setStep(5); // Proceed to booking summary
    };
  
    const finalizeBooking = () => {
      if (!selectedSpecialist || !selectedService || !selectedDate || !selectedTime) {
        message.error("Пожалуйста, заполните все данные для записи.");
        return;
      }
  
      console.log({
        specialist: selectedSpecialist.name,
        service: selectedService.name,
        date: selectedDate,
        time: selectedTime,
      });
  
      message.success("Запись успешно создана!");
      setModalVisible(false);
      resetBooking();
    };
  
    const resetBooking = () => {
      setStep(0);
      setSelectedSpecialist(null);
      setSelectedService(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectionPath(null);
    };
  
    const renderStepContent = () => {
      switch (step) {
        case 0:
          return (
            <div>
              <Button onClick={() => { setSelectionPath("specialist"); setStep(1); }}>Выбрать специалиста</Button>
              <Button onClick={() => { setSelectionPath("service"); setStep(1); }}>Выбрать услугу</Button>
              <Button onClick={() => { setSelectionPath("date"); setStep(1); }}>Выбрать дату и время</Button>
            </div>
          );
        case 1:
          if (selectionPath === "specialist") {
            return (
              <SpecialistSelection
                specialists={specialists}
                onSelectSpecialist={handleSpecialistSelect}
              />
            );
          } else if (selectionPath === "service") {
            return (
              <ServiceSelection
                services={services}
                onSelectService={handleServiceSelect}
              />
            );
          } else {
            const availableDates = specialists.flatMap((s) => s.availableDates);
            return (
              <DateSelection
                availableDates={availableDates}
                selectedDate={selectedDate}
                onSelectDate={handleDateSelect}
                onSelectTime={handleTimeSelect}
              />
            );
          }
        case 2:
          return (
            <ServiceSelection
              services={services.filter((s) => selectedSpecialist?.services.includes(s.name))}
              onSelectService={handleServiceSelect}
            />
          );
        case 3:
          return (
            <DateSelection
              availableDates={selectedSpecialist?.availableDates || []}
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
              onSelectTime={handleTimeSelect}
            />
          );
        case 4:
          if (!selectedSpecialist || !selectedDate) {
            message.error("Пожалуйста, выберите дату.");
            setStep(3); // Redirect back to date selection
            return null;
          }
          const timesForSelectedDate =
            selectedSpecialist.availableDates.find((d:any) => d.date === selectedDate)?.times || [];
          if (timesForSelectedDate.length === 0) {
            message.error("Нет доступного времени для этой даты.");
            setStep(3); // Redirect back to date selection
            return null;
          }
          return (
            <div>
              <h3>Доступное время:</h3>
              {timesForSelectedDate.map((time:any) => (
                <Button key={time} onClick={() => handleTimeSelect(time)}>
                  {time}
                </Button>
              ))}
            </div>
          );
        case 5:
          if (!selectedSpecialist || !selectedService || !selectedDate || !selectedTime) {
            message.error("Пожалуйста, заполните все данные для записи.");
            setStep(4); // Redirect back to time selection
            return null;
          }
  
          return (
            <BookingSummary
              specialist={selectedSpecialist.name}
              service={selectedService.name}
              date={selectedDate}
              time={selectedTime}
              onFinalize={finalizeBooking}
            />
          );
        default:
          return null;
      }
    };
  
    return (
      <div>
        <Button onClick={() => setModalVisible(true)}>Записаться</Button>
        <Modal open={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
          {renderStepContent()}
        </Modal>
      </div>
    );
  };
  
  export default Business;