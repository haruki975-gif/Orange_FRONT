import { useRef, useState } from "react";
import AffiliatedTeam from "./component/affiliated-team/AffiliatedTeam";
import CreateTeamModal from "./component/create-team-modal/CreateTeamModal";
import HostTeam from "./component/host-team/HostTeam";
import SearchTeam from "./component/search-team/SearchTeam";
import "./TeamComponent.css";
import { PiTrendUp } from "react-icons/pi";

const TeamComponent = ({errorAlert}) =>{

    const [openModal, setOpenModal] = useState(false);
    const [updateTeamList, setUpdateTeamList] = useState(true);
    const modalBackground = useRef();

    const categories = [
        {key : "all", label : "전체"},
        {key : "study", label : "스터디"},
        {key : "project", label : "프로젝트"},
        {key : "free", label : "자유"}
    ];

    const findCategoryLabel = (key) =>{
        return categories.find(category => category.key === key)?.label;
    }

    
    
    return(
        <section id="team-page">
            <div className="left">
                <HostTeam setOpenModal={setOpenModal} updateTeamList={updateTeamList} findCategoryLabel={findCategoryLabel}/>
                <AffiliatedTeam updateTeamList={updateTeamList} findCategoryLabel={findCategoryLabel}/>
            </div>
            <div className="right">
                <SearchTeam updateTeamList={updateTeamList} categories={categories} findCategoryLabel={findCategoryLabel}/>
            </div>

            {openModal && 
                <CreateTeamModal 
                    setOpenModal={setOpenModal} 
                    modalBackground={modalBackground} 
                    setUpdateTeamList={setUpdateTeamList}
                    categories={categories}/>
            }
        </section>
    )
} 

export default TeamComponent;