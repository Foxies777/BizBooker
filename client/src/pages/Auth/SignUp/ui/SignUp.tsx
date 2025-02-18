import { Button,  Col, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../index";
import { useSignUp, signUpFx, BizRoutes } from "../index";
import InputMask from "react-input-mask";
import "../styles/SignUp.css";
const Registration = () => {
    const [signUp, loading] = useSignUp();
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
                                    message: "Пожалуйста, введите ваш телефон!",
                                },
                                {
                                    pattern:
                                        /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
                                    message:
                                        "Телефон должен быть в формате +7 (___) ___-__-__",
                                },
                            ]}
                            normalize={(value) => value.slice(0, 18)} // Обрезает строку, если ввели лишние символы
                        >
                            <InputMask
                                mask="+7 (999) 999-99-99"
                                maskChar={null} // Убираем символы-заполнители
                                alwaysShowMask
                            >
                                {(inputProps) => <Input {...inputProps} />}
                            </InputMask>
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
    );
};

export default Registration;
