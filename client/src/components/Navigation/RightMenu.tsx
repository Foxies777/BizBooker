// RightMenu.tsx
import { Menu, Avatar, Button, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
    UserOutlined,
    CodeOutlined,
    LogoutOutlined,
    PlusOutlined,
    LoginOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { BizRoutes } from "../../utils/const";
import { useBusinesses } from "../../context/BusinessesContext";
import { useProfile } from "../../context/ProfileContext";
import { useUnit } from "effector-react";
import { $isAuth } from "../../shared/auth";
import { setCurrentBusiness } from "../../shared/business";
import { useStaffBusiness } from "../../pages/Staff/hooks/useStaffBusiness";


interface RightMenuProps {
    mode: "horizontal" | "vertical" | "inline";
}

const RightMenu = ({ mode }: RightMenuProps) => {
    const navigate = useNavigate();
    const { user, loading: userLoading, logout } = useProfile();
    const { businesses, loading: businessesLoading } = useBusinesses();
    const [staffBusiness, loading] = useStaffBusiness()
    const isAuth = useUnit($isAuth);
    
    const logoutHandler = () => {
        logout();
        navigate("/");
        console.log("выход");
    };

    const handleBusinessClick = (business: any) => {
        setCurrentBusiness(business);
        localStorage.setItem("currentBusiness", JSON.stringify(business));
        navigate(BizRoutes.BUSINESS_DASHBOARD.replace(":id", business._id));
    };
    const handleStaffBusinessClick = (business: any) => {
        console.log('232323232',business);
        
        setCurrentBusiness(business);
        localStorage.setItem("currentBusiness", JSON.stringify(business));
        navigate(BizRoutes.STAFF_DASHBOARD.replace(":id", business._id));
    };
    if (userLoading || businessesLoading || loading) {
        return <Spin />;
    }

    const getMenuItems = () => {
        if (isAuth && user) {
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
                        ...businesses.map((business) => ({
                            key: business._id,
                            label: (
                                <div
                                    onClick={() =>
                                        handleBusinessClick(business)
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    {business.name}
                                </div>
                            ),
                        })),
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
                case "staff":
                    return [
                        {
                            key: "about-us",
                            label: (
                                <Link to={BizRoutes.PROFILE}>
                                    <UserOutlined /> Профиль
                                </Link>
                            ),
                        },
                        ...staffBusiness.map((business) => ({
                            key: business.businessId._id,
                            label: (
                                <div
                                    onClick={() =>
                                        handleStaffBusinessClick(business)
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    {business.businessId.name}
                                </div>
                            ),
                        })),
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
                        {user ? user.name : "Guest"}
                    </span>
                </>
            ),
            children: getMenuItems(),
        },
    ];

    return <Menu mode={mode} items={items} />;
};

export default RightMenu;
