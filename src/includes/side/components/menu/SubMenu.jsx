import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
const SubMenu = (props) => {
=======
const SubMenu = ({menu}) =>{
>>>>>>> 9c77725eef4412d4dd9028b2a2d062f4083326f6

    const navi = useNavigate();

    const name = menu.name ? menu.name : menu.title;
    const icon = menu.icon;
    const path = menu.path ? menu.path : "/team-room/" + menu.teamId;
    const index = menu.index;
 

<<<<<<< HEAD
    return (
        <>
            <div className="menu" onClick={() => { console.log(path); navi(path) }}>
                <div className="icon">
                    <img src={icon} alt="" />
                </div>
                <p className="menu-name">{name}</p>
=======
    return(

        <div className="menu" key={index}
            onClick={() => {navi(path)}}>
            <div className="icon">
                <img src={icon ? icon : "/img/icon/journal-frame.png"} alt=""/>
>>>>>>> 9c77725eef4412d4dd9028b2a2d062f4083326f6
            </div>
            <p className="menu-name">{name}</p>
        </div>

    )
}

export default SubMenu;