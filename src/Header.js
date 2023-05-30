import {
  AppstoreOutlined,
  HomeFilled,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import "./header.css";

const items = [
  {
    label: "Home",
    key: "home",
    icon: <HomeFilled />,
  },
  {
    label: "Navigation Two",
    key: "app",
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: "Navigation Three - Submenu",
    key: "SubMenu",
    icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          {
            label: "Option 1",
            key: "setting:1",
          },
          {
            label: "Option 2",
            key: "setting:2",
          },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          {
            label: "Option 3",
            key: "setting:3",
          },
          {
            label: "Option 4",
            key: "setting:4",
          },
        ],
      },
    ],
  },
  {
    label: (
      <a
        href="https://www.google.com/maps/@41.7542879,44.7620254,14z?entry=ttu"
        target="_blank"
        rel="noopener noreferrer"
      >
        Navigation Four - Link
      </a>
    ),
    key: "alipay",
  },
];
const Header = () => {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Menu
      className="menu"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      theme="dark"
    />
  );
};
export default Header;
