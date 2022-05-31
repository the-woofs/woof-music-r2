import Center from "./Center";
import "./index.css";
import Left from "./Left";
import Right from "./Right";
import store from "../../store";

function Footer() {
  const [isCollapsed] = store.useState("isSideBarCollapsed");
  return (
    <div className={!isCollapsed ? "footer" : "mobile-footer"}>
      {!isCollapsed && <Left className='lft' />}
      <Center />
      {!isCollapsed && <Right className='rt' />}
    </div>
  );
}

export default Footer;
