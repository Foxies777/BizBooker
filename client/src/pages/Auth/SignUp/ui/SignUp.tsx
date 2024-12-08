import { Button, Checkbox, Col, Form, Input, Row } from "antd"
import { Link, useNavigate } from "react-router-dom"
import "../index"
import { useSignUp, signUpFx, BizRoutes } from "../index"

const Registration = () => {
    const [signUp, loading] = useSignUp()

    const navigate = useNavigate()

    signUpFx.done.watch(() => {
        // navigate(ERoutes.PROFILE)
    })
    return (
        <Col className="styles">
            <Row justify={"center"}>
                <div>
                    <div className="header">
                        {/* <img src={logo} alt="" /> */}
                        <h1>Регистрация</h1>
                    </div>
                    <Form
                        className="form"
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        onFinish={signUp}
                    >
                        <Form.Item
                            label="Фамилия"
                            name="surname"
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
                            label="Имя"
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
                            label="Отчество"
                            name="patronymic"
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
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    min: 8,
                                    message:
                                        "Длина пароля должна составлять не менее 8 символов",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <div className="buttons">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Регистрация
                                </Button>
                                <Link className="button" to={BizRoutes.LOGIN}>
                                    Войти
                                </Link>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Row>
        </Col>
    )
}

export default Registration
