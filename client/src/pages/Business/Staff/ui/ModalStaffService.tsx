import { Button, Form, Modal, Select } from "antd";
import { useState, useEffect } from "react";
import { useGetBusinessService } from "../../Services/hooks/useGetBusinessService";
import { useAddServices } from "../hooks/useAddServices";

interface ModalStaffServiceProps {
    visible: boolean;
    onClose: () => void;
    staff: {
        id: string;
        services?: {
            id: string;
            name: string;
        }[];
    };
}

const ModalStaffService: React.FC<ModalStaffServiceProps> = ({ visible, onClose, staff }) => {
    const [services, loading] = useGetBusinessService();
    const { addServices, loading: addLoading } = useAddServices();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        if (visible && staff.services) {
            setSelectedItems(staff.services.map((service) => service.id));
        }
    }, [visible, staff.services]);

    const filteredServices = services.filter(
        (service) => !staff.services?.some((staffService) => staffService.id === service._id)
    );

    const handleFinish = () => {
        addServices({ staffId: staff.id, serviceIds: selectedItems }).then(() => {
            console.log("Услуги успешно добавлены/обновлены");
            onClose();
        });
    };

    return (
        <Modal
            title="Управление услугами сотрудника"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form
                className="form"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
                onFinish={handleFinish}
            >
                <Form.Item name="services" rules={[{ required: true }]} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                    <Select
                        mode="multiple"
                        placeholder="Выберите услугу (-и)"
                        value={selectedItems}
                        onChange={setSelectedItems}
                        style={{ width: "100%" }}
                        options={[
                            ...staff.services?.map((service) => ({
                                value: service.id,
                                label: service.name,
                                disabled: true, // Услуги уже у сотрудника, их нельзя снять
                            })) || [],
                            ...filteredServices.map((service) => ({
                                value: service._id,
                                label: service.name,
                            })),
                        ]}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button style={{ marginTop: "20px" }} type="primary" htmlType="submit" loading={loading || addLoading}>
                        Обновить / Добавить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalStaffService;
