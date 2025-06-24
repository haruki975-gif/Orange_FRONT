import { useState } from "react";
import Menu from "../menu/Menu";
import { useNavigate } from "react-router-dom";


const Tab = (props) =>{

    const navi = useNavigate();

    const menu = props.menu.main;
    const subMenu = props.menu.subMenu;
    const path = props.menu.path;

    const [openTab, setOpenTab] = useState(false);

    const openTabHandler = () =>{
        console.log("aaa")
        setOpenTab(!openTab)
    }



    return(
        <div className="tab" onClick={() => navi(path)}>  
            <Menu name={menu.name} icon={menu.icon} onClick={openTabHandler}/>
            <div className={`sub-menus ${openTab ? 'active' : ''}`}>
                {subMenu && subMenu.map(menu => (
                    <Menu name={menu.name} icon={menu.icon}/>
                ))}
            </div>
        </div>
    )
}

export default Tab;