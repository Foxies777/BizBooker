import { Button, Form, Modal, Select } from "antd";
import { useState, useEffect } from "react";
import { useGetBusinessService } from "../../Services/hooks/useGetBusinessService";
import { useAddServices } from "../hooks/useAddServices";
import { useUpdateServices } from "../hooks/useUpdateServices"; // Добавляем update
import { useUnit } from "effector-react";

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
    const [services, servicesLoading] = useGetBusinessService();
    const { addServices, loading: addLoading } = useAddServices();
    const { updateServices, loading: updateLoadingStore } = useUpdateServices(); 

    const updateLoading = useUnit(updateLoadingStore);

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible && staff.services) {
            const serviceIds = staff.services.map((service) => service.id);
            setSelectedItems(serviceIds);
            form.setFieldsValue({ services: serviceIds });
        }
    }, [visible, staff.services, form]);

    const serviceOptions = services.map((service) => ({
        value: service._id,
        label: service.name,
    }));

    const handleFinish = async (values: { services: string[] }) => {
        const hasExistingServices = staff.services && staff.services.length > 0;
        const updatedServiceIds = values.services;

        if (hasExistingServices) {
            await updateServices({ staffId: staff.id, serviceIds: updatedServiceIds });
            console.log("Услуги обновлены:", updatedServiceIds);
        } else {
            await addServices({ staffId: staff.id, serviceIds: updatedServiceIds });
            console.log("Услуги добавлены:", updatedServiceIds);
        }
        
        onClose();
    };

    return (
        <Modal title="Управление услугами сотрудника" open={visible} onCancel={onClose} footer={null}>
            <Form form={form} name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} autoComplete="off" initialValues={{ services: selectedItems }} onFinish={handleFinish}>
                <Form.Item name="services" rules={[{ required: true }]} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                    <Select
                        mode="multiple"
                        placeholder="Выберите услугу (-и)"
                        value={selectedItems}
                        onChange={(values) => {
                            setSelectedItems(values);
                            form.setFieldsValue({ services: values });
                        }}
                        style={{ width: "100%" }}
                        options={serviceOptions}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        style={{ marginTop: "20px" }}
                        type="primary"
                        htmlType="submit"
                        loading={servicesLoading || addLoading || updateLoading} // Теперь updateLoading - это boolean
                    >
                        {staff.services && staff.services.length > 0 ? "Обновить" : "Добавить"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalStaffService;
