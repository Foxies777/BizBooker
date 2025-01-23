import React from "react";
import { List, Card } from "antd";

interface SpecialistSelectionProps {
  specialists: any[];
  onSelectSpecialist: (id: number) => void;
}

const SpecialistSelection: React.FC<SpecialistSelectionProps> = ({
  specialists,
  onSelectSpecialist,
}) => (
  <List
    dataSource={specialists}
    renderItem={(item) => (
      <List.Item onClick={() => onSelectSpecialist(item.id)}>
        <Card title={item.name} extra={item.role}>
          <p>Ближайшая дата: {item.availableDates[0]?.date || "Нет доступных дат"}</p>
        </Card>
      </List.Item>
    )}
  />
);

export default SpecialistSelection;
