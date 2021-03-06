import Center from "./Center";
import "./index.css";
import Left from "./Left";
import Right from "./Right";
import Mobile from "./Mobile";
import store from "../../store";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { DatabaseFilled, HomeFilled, SearchOutlined } from "@ant-design/icons";

function Footer() {
  const [isCollapsed] = store.useState("isSideBarCollapsed");
  const navigate = useNavigate();
  return (
    <>
      <div className={!isCollapsed ? "footer" : ""}>
        <>
          <Left className="lft" />
          <Center />
          <Right className="rt" />
        </>
      </div>
      <div className="mobile-footer">
        <Mobile className="mobile" />
        <Space
          style={{
            width: "100vw",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          wrap
        >
          <Button
            onClick={() => {
              navigate("/");
            }}
            type="text"
            shape="round"
            icon={<HomeFilled />}
          >
            Home
          </Button>
          <Button
            onClick={() => {
              navigate("/search");
            }}
            type="text"
            shape="round"
            icon={<SearchOutlined />}
          >
            Search
          </Button>
          <Button
            type="text"
            shape="round"
            onClick={() => {
              navigate("/playlist");
            }}
            icon={<DatabaseFilled />}
          >
            Library
          </Button>
        </Space>
      </div>
    </>
  );
}

export default Footer;
