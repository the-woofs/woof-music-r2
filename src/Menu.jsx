import {
  DatabaseFilled,
  HomeFilled,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

function MenuItems() {
  const navigate = useNavigate();

  const path = window.location.pathname;

  return (
    <>
      <Menu
        style={{
          height: "100%",
          paddingTop: "14px",
        }}
        selectedKeys={[path]}
      >
        <div
          style={{
            height: 44,
          }}
        />
        <Menu.Item
          key='/'
          icon={<HomeFilled />}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key='/search'
          icon={<SearchOutlined />}
          onClick={() => {
            navigate("/search");
          }}
        >
          Search
        </Menu.Item>
        <Menu.Item
          key='/playlist'
          icon={<DatabaseFilled />}
          onClick={() => {
            navigate("/playlist");
          }}
        >
          Playlists
        </Menu.Item>
        <Menu.Item icon={<PlusOutlined />}>Create Playlist</Menu.Item>
      </Menu>
    </>
  );
}

export default MenuItems;
