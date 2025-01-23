import React from "react";
import { Button } from "antd";

interface BookingSummaryProps {
  specialist: string;
  service: string;
  date: string;
  time: string;
  onFinalize: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  specialist,
  service,
  date,
  time,
  onFinalize,
}) => (
  <div>
    <p>Выбрано:</p>
    <p>Специалист: {specialist}</p>
    <p>Услуга: {service}</p>
    <p>Дата: {date}</p>
    <p>Время: {time}</p>
    <Button type="primary" onClick={onFinalize}>
      Готово
    </Button>
  </div>
);

export default BookingSummary;

