import { Button, Form, Input, Modal } from 'antd'
import { useState } from 'react'
import { useCreateService } from '../hooks/useCreateService'

const ModalCreateService = () => {
    const [visible, setVisible] = useState(false)
    const [service, loading] = useCreateService()

    const showModal = () => {
        setVisible(true)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const handleFinish = (values: any) => {
        service(values)
        setVisible(false)
    }
  return (
    <>
            <Button type="primary" onClick={showModal}>
                Создать услуги
            </Button>
            <Modal
                title="Добавить услугу"
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
                        label="Название"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Введите название услуги!",
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
                                required: false,
                                message: "Опишите услугу!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Продолжительность!"
                        name="duration"
                        rules={[
                            {
                                required: true,
                                message: "Введите продолжительность (в минутах)!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Стоимость"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: "Введите стоимость услуги",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Добавить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
  )
}

export default ModalCreateService