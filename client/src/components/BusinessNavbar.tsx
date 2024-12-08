import { Layout, Menu } from "antd";
import { ReactNode, useState } from "react";
import {
    HomeOutlined,
    LineChartOutlined,
    UserOutlined,
    TeamOutlined,
    AppstoreAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useUnit } from "effector-react";
import { $currentBusiness } from "../shared/business";
import { BizRoutes } from "../utils/const";

const { Sider, Content } = Layout;
interface BusinessNavProps {
    children: ReactNode,
    selectKey: string,
}
const BusinessNavbar: React.FC<BusinessNavProps> = ({children, selectKey}) => {
    const [collapsed, setCollapsed] = useState(false);
    const currentBusiness = useUnit($currentBusiness);
    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    };
    return (
        <Layout>
            <Sider style={{marginTop: '-20px'}} collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <Menu theme="dark" defaultSelectedKeys={[selectKey]} mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link
                            to={BizRoutes.BUSINESS_DASHBOARD.replace(
                                ":id",
                                currentBusiness._id
                            )}
                        >Главная</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
                        Услуги
                    </Menu.Item>
                    <Menu.Item key="3" icon={<LineChartOutlined />}>
                        Аналитика
                    </Menu.Item>
                    <Menu.Item key="4" icon={<TeamOutlined />}>
                        <Link
                            to={BizRoutes.BUSINESS_DASHBOARD_STAFF.replace(
                                ":id",
                                currentBusiness._id
                            )}
                        >
                            Сотрудники
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<UserOutlined />}>
                        Профиль
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Content style={{ margin: "0 16px" }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default BusinessNavbar;
