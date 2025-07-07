
const Menu = (props) =>{

    const name = props.name;
    const icon = props.icon;
    const path = props.path;
    

    return(
        <>
            <div className="menu" onClick={props.onClick}>
                <div className="icon">
                    <img src={icon} alt=""/>
                </div>
                <p className="menu-name">{name}</p>
            </div>
        </>
    )
}

export default Menu;