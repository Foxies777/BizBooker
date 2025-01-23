import React from "react";
import { List, Card } from "antd";

interface ServiceSelectionProps {
  services: any[];
  onSelectService: (id: number) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ services, onSelectService }) => (
  <List
    dataSource={services}
    renderItem={(item) => (
      <List.Item onClick={() => onSelectService(item.id)}>
        <Card title={item.name}>{item.duration}</Card>
      </List.Item>
    )}
  />
);

export default ServiceSelection;
