import {
  BarsOutlined,
  DatabaseFilled,
  DownloadOutlined,
  HomeFilled,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Divider, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import store from "./store";

function MenuItems() {
  const navigate = useNavigate();
  const [isCreatingPlaylist, setIsCreatingPlaylist] =
    store.useState("isCreatingPlaylist");

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
          key="/"
          icon={<HomeFilled />}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="/search"
          icon={<SearchOutlined />}
          onClick={() => {
            navigate("/search");
          }}
        >
          Search
        </Menu.Item>
        <Menu.Item
          key="/playlist"
          icon={<DatabaseFilled />}
          onClick={() => {
            navigate("/playlist");
          }}
        >
          Playlists
        </Menu.Item>
        <Menu.Item
          key="/queue"
          icon={<BarsOutlined />}
          onClick={() => {
            navigate("/queue");
          }}
        >
          Queue
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIsCreatingPlaylist(!isCreatingPlaylist);
          }}
          icon={<PlusOutlined />}
        >
          Create Playlist
        </Menu.Item>
        <Divider />
        <Menu.Item
          key="download"
          icon={<DownloadOutlined />}
          onClick={() => {
            window.location.href =
              "https://github.com/the-woofs/woof-music-r2/releases";
          }}
        >
          Download
        </Menu.Item>
      </Menu>
    </>
  );
}

export default MenuItems;
