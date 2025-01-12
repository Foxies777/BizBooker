import { Button, Form, Modal, Select } from "antd";
import { useState } from "react";
import { useGetBusinessService } from "../../Services/hooks/useGetBusinessService";
import { useAddServices } from "../hooks/useAddServices";

interface ModalStaffServiceProps {
    visible: boolean;
    onClose: () => void;
    staffId: string;
}

const ModalStaffService: React.FC<ModalStaffServiceProps> = ({ visible, onClose, staffId }) => {
    const [services, loading] = useGetBusinessService();
    const { addServices, loading: addLoading } = useAddServices();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const filteredServices = services.filter((s) => !selectedItems.includes(s.name));

    const handleFinish = () => {
        addServices({ staffId, serviceIds: selectedItems }).then(() => {
            console.log("Услуги успешно добавлены сотруднику");
            onClose();
        });
    };

    return (
        <Modal
            title="Добавить услуги"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form
                className="form"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={handleFinish}
            >
                <Form.Item
                    name="services"
                    rules={[{ required: true }]}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Select
                        mode="multiple"
                        placeholder="Выберите услугу (-и)"
                        value={selectedItems}
                        onChange={setSelectedItems}
                        style={{ width: "100%" }}
                        options={filteredServices.map((item) => ({
                            value: item._id,
                            label: item.name,
                        }))}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        style={{ marginTop: "20px" }}
                        type="primary"
                        htmlType="submit"
                        loading={loading || addLoading}
                    >
                        Добавить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalStaffService;
