import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useCreateCategory } from "../hooks/useBusinesses"; // Импортируем resetForm
import { CreateCategoryRequest } from "../../../shared/api/business/model";
import { resetForm } from "../../../shared/business";

const AddCategorysForm = () => {
    const { handleCreateCategory, loading } = useCreateCategory();
    const [form] = Form.useForm();

    
    useEffect(() => {
        const unsubscribe = resetForm.watch(() => {
            form.resetFields(); 
        });

        return () => unsubscribe(); 
    }, [form]);

    const onFinish = (values: CreateCategoryRequest) => {
        console.log('Form values:', values);
        handleCreateCategory(values);
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
                name="name"
                label="Business Name"
                rules={[{ required: true, message: "Добавьте категорию" }]}
            >
                <Input placeholder="Добавить категорию" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Добавить
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddCategorysForm;