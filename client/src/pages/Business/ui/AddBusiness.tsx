import { Form, Input } from "antd";

const AddBusiness = () => {
    return (
        <Form
            layout="vertical"
            className="form"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            // onFinish={}
        >
            <Form.Item
                label="Название"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Please input your username!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Описание"
                name="description"
                rules={[
                    {
                        required: true,
                        message: "Please input your username!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Категория"
                name="category"
                rules={[
                    {
                        required: false,
                        message: "Please input your username!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Адрес"
                name="address"
                rules={[
                    {
                        required: true,
                        type: "email",
                        pattern: new RegExp(
                            "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
                        ),
                        message: "Please input your username!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Телефон"
                name="phone"
                rules={[
                    {
                        required: true,
                        message: "Please input your username!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        type: "email",
                        pattern: new RegExp(
                            "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
                        ),
                        message: "Please input your username!",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
        </Form>
    );
};

export default AddBusiness;
