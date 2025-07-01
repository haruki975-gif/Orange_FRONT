import { useNavigate } from "react-router-dom";

const SubMenu = ({ menu }) => {
  const navi = useNavigate();

  const name = menu.name ? menu.name : menu.title;
  const icon = menu.icon;
  const path = menu.path ? menu.path : "/team-room/" + menu.teamId;
  const index = menu.index;

  return (
    <div
      className="menu"
      key={index}
      onClick={() => {
        navi(path);
      }}
    >
      <div className="icon">
        <img src={icon ? icon : "/img/icon/journal-frame.png"} alt="" />
      </div>
      <p className="menu-name">{name}</p>
    </div>
  );
};

export default SubMenu;
