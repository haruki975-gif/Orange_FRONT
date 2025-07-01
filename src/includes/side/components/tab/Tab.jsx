import { useRef, useState } from "react";
import Menu from "../menu/Menu";
import { useNavigate } from "react-router-dom";
import SubMenu from "../menu/SubMenu";
const Tab = (props) => {
    const navi = useNavigate();
    const tab = useRef();
    const menu = props.menu.main;
    const subMenu = props.menu.subMenu;
    const path = props.menu.path;
    const [openTab, setOpenTab] = useState(false);
    const openTabHandler = () => {
        setOpenTab(!openTab);
        navi(path)
    }
    return (
        <div className="tab">
            <Menu name={menu.name} icon={menu.icon} onClick={openTabHandler} />
            <div className={`sub-menus ${openTab ? 'active' : ''}`}>
<<<<<<< HEAD
                {subMenu && subMenu.map(menu => (
                    <SubMenu name={menu.name} icon={menu.icon} path={menu.path} />
=======
                {subMenu && subMenu.map((menu, index) => (
                    <SubMenu key={index} menu={menu} name={menu.name ? menu.name : menu.title} icon={menu.icon} path={menu.path}/>
>>>>>>> 9c77725eef4412d4dd9028b2a2d062f4083326f6
                ))}
            </div>
        </div>
    )
}
export default Tab;