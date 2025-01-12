import { Modal, Button, Input, Form } from "antd";
import { useVerifyCode } from "../hooks/useVerify";

interface VerificationModalProps {
    visible: boolean;
    onClose: () => void;
    userId: string;
    businessId: string;
}

const VerificationModal: React.FC<VerificationModalProps> = ({
    visible,
    onClose,
    userId,
    businessId,
}) => {
    const { verifyCode, loading } = useVerifyCode();
    const [form] = Form.useForm();

    const handleVerify = (values: { code: string }) => {
        const data = { ...values, userId, businessId };
        verifyCode(data).then(() => {
            form.resetFields();
            onClose();
        });
    };

    return (
        <Modal
            title="Подтверждение приглашения"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} onFinish={handleVerify}>
                <Form.Item
                    name="code"
                    label="Код"
                    rules={[{ required: true, message: "Введите код подтверждения" }]}
                >
                    <Input placeholder="Введите код" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Подтвердить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default VerificationModal;
