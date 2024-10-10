import { Menu } from "antd";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";

interface LeftMenuProps {
    mode: "horizontal" | "vertical" | "inline";
}

const items: MenuProps['items'] = [
    { key: 'home', label: <Link to="/">Home</Link> },
    { key: 'features', label: <Link to="/features">Features</Link> },
    { key: 'about', label: <Link to="/about">About Us</Link> },
    { key: 'contact', label: <Link to="/contact">Contact Us</Link> },
];

const LeftMenu = ({ mode }: LeftMenuProps) => {
    return (
        <Menu mode={mode} items={items} />
    );
};

export default LeftMenu;
