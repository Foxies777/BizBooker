import { Layout, Card, Row, Col, Spin,  Modal, Input } from "antd";
import BusinessNavbar from "../../../../components/BusinessNavbar";
import Navbar from "../../../../components/Navigation";
import ModalCreateService from "./ModalCreateService";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetBusinessService } from "../hooks/useGetBusinessService";
import { useDeleteService } from "../hooks/useDeleteService";
import { useUpdateService } from "../hooks/useUpdateService";
import { useState } from "react";

const Service = () => {
    const [services, loading] = useGetBusinessService();
    const { deleteService } = useDeleteService();
    const { updateService } = useUpdateService();

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<any | null>(null);

    const handleDelete = async (serviceId: string) => {
        try {
            await deleteService(serviceId);
        } catch (error) {
            console.error("Ошибка при удалении услуги", error);
        }
    };

    const handleEdit = (service: any) => {
        setEditingService(service);
        setEditModalOpen(true);
    };

    const handleUpdate = async () => {
        if (!editingService) return;

        try {
            await updateService({
                serviceId: editingService._id,
                updateData: {
                    name: editingService.name,
                    description: editingService.description,
                    duration: editingService.duration, // ⚡ Оставляем `string`
                    price: editingService.price, // ⚡ Оставляем `string`
                },
            });
            setEditModalOpen(false);
        } catch (error) {
            console.error("Ошибка обновления услуги", error);
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Navbar />
            <BusinessNavbar selectKey="2">
                <ModalCreateService />
                {loading ? (
                    <Spin className="loading-spinner" />
                ) : (
                    <Row gutter={[16, 16]} className="service-grid">
                        {services.map((service) => (
                            <Col key={service._id} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    title={service.name}
                                    bordered={false}
                                    className="service-card"
                                    actions={[
                                        <EditOutlined key="edit" onClick={() => handleEdit(service)} />,
                                        <DeleteOutlined key="delete" onClick={() => handleDelete(service._id)} />,
                                    ]}
                                >
                                    <p className="service-description">{service.description}</p>
                                    <p className="service-duration">Длительность: {service.duration} мин</p>
                                    <p className="service-price">Цена: {service.price} ₽</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}

                {/* 🔥 Модальное окно редактирования */}
                <Modal
                    title="Редактировать услугу"
                    open={editModalOpen}
                    onOk={handleUpdate}
                    onCancel={() => setEditModalOpen(false)}
                >
                    <Input
                        value={editingService?.name}
                        onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                        placeholder="Название"
                    />
                    <Input
                        value={editingService?.description}
                        onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                        placeholder="Описание"
                    />
                    <Input
                        value={editingService?.duration}
                        onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                        placeholder="Длительность (мин)"
                    />
                    <Input
                        value={editingService?.price}
                        onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                        placeholder="Цена (₽)"
                    />
                </Modal>
            </BusinessNavbar>
        </Layout>
    );
};

export default Service;
