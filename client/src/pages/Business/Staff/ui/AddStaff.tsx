import { Button, Form, Input, Modal } from "antd"
import { useState } from "react"
import { useCreateStaff } from "../index"

const AddStaff = () => {
    const [visible, setVisible] = useState(false)
    const [staff, loading] = useCreateStaff()

    const showModal = () => {
        setVisible(true)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const handleFinish = (values: any) => {
        staff(values)
        setVisible(false)
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Добавить сотрудника
            </Button>
            <Modal
                title="Добавить сотрудника"
                open={visible}
                onCancel={handleCancel}
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
                        label="Имя"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Введите имя сотрудника!",
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
                                message: "Введите корректный email!",
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
                                message: "Введите телефонный номер!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Регистрация
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddStaff