import { Menu, Avatar, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
    UserOutlined,
    CodeOutlined,
    LogoutOutlined,
    PlusOutlined,
    LoginOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { $isAuth, tokenExprired } from "../../shared/auth";
import { useUnit } from "effector-react";
import { BizRoutes } from "../../utils/const";
import { getUserRole } from "../../utils/auth";
import { useEffect, useState } from "react";

interface RightMenuProps {
    mode: "horizontal" | "vertical" | "inline";
}

const RightMenu = ({ mode }: RightMenuProps) => {
    const navigate = useNavigate();
    const isAuth = useUnit($isAuth);
    const [user, setUser] = useState(getUserRole());

    useEffect(() => {
        setUser(getUserRole());
    }, [isAuth]);

    const logoutHandler = () => {
        tokenExprired();
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    };

    const getMenuItems = () => {
        if (user) {
            switch (user.role) {
                case "admin":
                    return [
                        {
                            key: "project",
                            label: (
                                <Link to="/dashboard">
                                    <CodeOutlined /> Панель управления
                                </Link>
                            ),
                        },
                        {
                            key: "about-us",
                            label: (
                                <Link to={BizRoutes.PROFILE}>
                                    <UserOutlined /> Профиль
                                </Link>
                            ),
                        },
                        {
                            key: "log-out",
                            label: (
                                <Button type="link" onClick={logoutHandler}>
                                    <LogoutOutlined /> Выход
                                </Button>
                            ),
                        },
                    ];
                case "business":
                    return [
                        {
                            key: "about-us",
                            label: (
                                <Link to={BizRoutes.PROFILE}>
                                    <UserOutlined /> Профиль
                                </Link>
                            ),
                        },
                        {
                            key: "log-out",
                            label: (
                                <Button type="link" onClick={logoutHandler}>
                                    <LogoutOutlined /> Выход
                                </Button>
                            ),
                        },
                    ];
                default:
                    return [
                        {
                            key: "about-us",
                            label: (
                                <Link to={BizRoutes.PROFILE}>
                                    <UserOutlined /> Профиль
                                </Link>
                            ),
                        },
                        {
                            key: "add-business",
                            label: (
                                <Link to={BizRoutes.ADDBUSINESS}>
                                    <PlusOutlined /> Создать бизнес
                                </Link>
                            ),
                        },
                        {
                            key: "log-out",
                            label: (
                                <Button type="link" onClick={logoutHandler}>
                                    <LogoutOutlined /> Выход
                                </Button>
                            ),
                        },
                    ];
            }
        } else {
            return [
                {
                    key: "log-in",
                    label: (
                        <Link to={BizRoutes.LOGIN}>
                            <LoginOutlined /> Вход
                        </Link>
                    ),
                },
                {
                    key: "register",
                    label: (
                        <Link to={BizRoutes.REGISTRATION}>
                            <UserOutlined /> Регистрация
                        </Link>
                    ),
                },
            ];
        }
    };

    const items: MenuProps["items"] = [
        {
            key: "sub1",
            label: (
                <>
                    <Avatar icon={<UserOutlined />} />
                    <span className="username">
                        {user ? "John Doe" : "Guest"}
                    </span>
                </>
            ),
            children: getMenuItems(),
        },
    ];

    return <Menu mode={mode} items={items} />;
};

export default RightMenu;
