import React from 'react';
import styles from './NavMenu.module.css'
import { SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {useLocation, useNavigate} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Home', '/'),

  getItem('Profile', '/profile'),

  getItem('Users', '/users', <SettingOutlined />),

];


export const NavMenu = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  };

  return (
    <Menu
      onClick={onClick}
      className={styles.menu}
      defaultSelectedKeys={[location.pathname]}
      mode="inline"
      items={items}
    />
  );
};