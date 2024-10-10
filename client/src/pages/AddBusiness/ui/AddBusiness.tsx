import { Button, Form, Input } from "antd";
import { useCreateBusiness } from "../hooks/useCreateBusiness";
import { CreateBusinessRequest } from "../../../shared/api/business/model";

const AddBusinessForm = () => {
    const { handleCreateBusiness, loading } = useCreateBusiness();
    const [form] = Form.useForm();

    const onFinish = (values: Omit<CreateBusinessRequest, 'userId'>) => {
        console.log('Form values:', values);
        handleCreateBusiness(values);
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
                name="name"
                label="Business Name"
                rules={[{ required: true, message: "Please enter business name" }]}
            >
                <Input placeholder="Enter business name" />
            </Form.Item>
            <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: "Please enter description" }]}
            >
                <Input.TextArea placeholder="Enter business description" />
            </Form.Item>
            <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Please enter category" }]}
            >
                <Input placeholder="Enter business category" />
            </Form.Item>
            <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Please enter address" }]}
            >
                <Input placeholder="Enter business address" />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: "Please enter phone" }]}
            >
                <Input placeholder="Enter phone number" />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter email" }]}
            >
                <Input placeholder="Enter email address" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Add Business
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddBusinessForm;
