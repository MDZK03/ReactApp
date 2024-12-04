import { Outlet, Link } from "react-router-dom";
import { UserOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useEffect, useState } from "react";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: <Link to='/'>Trang Chu</Link>,
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: <Link to='/users'>Manage Users</Link>,
        key: 'users',
        icon: <UserOutlined />,
    }
];

const Header = () => {
    const [current, setCurrent] = useState('home');
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (<Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />);
};

export default function MainLayout() {
    useEffect(() => {
        getToken()
    }, [])

    const getToken = async () => {
        const req = await fetch("http://localhost:8000/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "hoidanit@gmail.com",
                password: "123456"
            }),
        })
        const res = await req.json();
        localStorage.setItem("access_token", res.data.access_token)
    }

    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}