import { Menu } from "antd";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";

interface LeftMenuProps {
    mode: "horizontal" | "vertical" | "inline";
}

const items: MenuProps['items'] = [
    { key: 'home', label: <Link to="/">Главная</Link> },
];

const LeftMenu = ({ mode }: LeftMenuProps) => {
    return (
        <Menu mode={mode} items={items} />
    );
};

export default LeftMenu;
