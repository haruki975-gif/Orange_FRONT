import { useNavigate } from "react-router-dom";

const SubMenu = (props) => {

    const navi = useNavigate();

    const name = props.name;
    const icon = props.icon;
    const path = props.path;


    return (
        <>
            <div className="menu" onClick={() => { console.log(path); navi(path) }}>
                <div className="icon">
                    <img src={icon} alt="" />
                </div>
                <p className="menu-name">{name}</p>
            </div>
        </>
    )
}

export default SubMenu;