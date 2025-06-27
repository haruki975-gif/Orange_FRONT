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

    
    
    return(
        <section id="team-page">
            <div className="left">
                <HostTeam setOpenModal={setOpenModal} updateTeamList={updateTeamList} />
                <AffiliatedTeam updateTeamList={updateTeamList}/>
            </div>
            <div className="right">
                <SearchTeam updateTeamList={updateTeamList}/>
            </div>

            {openModal && 
                <CreateTeamModal 
                    setOpenModal={setOpenModal} 
                    modalBackground={modalBackground} 
                    setUpdateTeamList={setUpdateTeamList}/>
            }
        </section>
    )
} 

export default TeamComponent;