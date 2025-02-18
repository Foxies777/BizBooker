import { Button, Form, Input, Select } from "antd";
import { useCreateBusiness } from "../hooks/useCreateBusiness";
import { CreateBusinessRequest } from "../../../shared/api/business/model";
import { useGetCategory } from "../hooks/useGetCategory";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Business";
import InputMask from "react-input-mask-next"; // Используем `react-input-mask-next`

const AddBusinessForm = () => {
    const { handleCreateBusiness, loading } = useCreateBusiness();
    const [categories, catLoading] = useGetCategory();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values: Omit<CreateBusinessRequest, "userId">) => {
        console.log("Form values:", values);
        handleCreateBusiness(values);
        navigate("/profile");
    };

    return (
        <>
            <Navbar />
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="name"
                    label="Business Name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter business name",
                        },
                    ]}
                >
                    <Input placeholder="Enter business name" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        { required: true, message: "Please enter description" },
                    ]}
                >
                    <Input.TextArea placeholder="Enter business description" />
                </Form.Item>

                <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                        { required: true, message: "Please select category" },
                    ]}
                >
                    <Select
                        placeholder="Select business category"
                        loading={catLoading}
                    >
                        {categories.map((category) => (
                            <Select.Option
                                key={category._id}
                                value={category._id}
                            >
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                        { required: true, message: "Please enter address" },
                    ]}
                >
                    <Input placeholder="Enter business address" />
                </Form.Item>

                <Form.Item
                    label="Телефон"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите ваш телефон!",
                        },
                        {
                            pattern:
                                /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
                            message:
                                "Телефон должен быть в формате +7 (___) ___-__-__",
                        },
                        {
                            validator: (_, value) => {
                                console.log(value);
                                
                                if (!value || value.includes("_")) {
                                    return Promise.reject(
                                        "Введите полный номер в формате +7 (___) ___-__-__"
                                    );
                                }
                                return Promise.resolve();
                            },
                        },
                        
                    ]}
                    normalize={(value) => value.slice(0, 18)}
                >
                    <InputMask mask="+7 (999) 999-99-99" maskPlaceholder={null}>
                        <Input placeholder="+7 (___) ___-__-__" />
                    </InputMask>

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
        </>
    );
};

export default AddBusinessForm;
