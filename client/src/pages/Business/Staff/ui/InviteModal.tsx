import { Modal, Button, Input, Select, Form } from "antd";
import { useState } from "react";
import { useSendInvitation } from "../hooks/useInvite";

interface InviteModalProps {
    visible: boolean;
    onClose: () => void;
    businessId: string;
}

const InviteModal: React.FC<InviteModalProps> = ({ visible, onClose, businessId }) => {
    const { sendInvitation, loading } = useSendInvitation();
    const [form] = Form.useForm();
    const [type, setType] = useState<"email" | "phone">("email");

    const handleSend = (values: any) => {
        const data = {
            [type]: values.contact,
            businessId
        };
        sendInvitation(data).then(() => {
            form.resetFields();
            onClose();
        });
    };

    return (
        <Modal
            title="Пригласить сотрудника"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} onFinish={handleSend}>
                <Form.Item name="type" label="Тип контакта">
                    <Select<"email" | "phone"> defaultValue="email" onChange={(value) => setType(value)}>
                        <Select.Option value="email">Email</Select.Option>
                        <Select.Option value="phone">Телефон</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="contact"
                    label="Контакт"
                    rules={[{ required: true, message: "Укажите email или телефон" }]}
                >
                    <Input placeholder={type === "email" ? "Введите email" : "Введите телефон"} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Отправить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default InviteModal;
