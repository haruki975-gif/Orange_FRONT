import { useRef, useState } from "react";
import AffiliatedTeam from "./component/affiliated-team/AffiliatedTeam";
import CreateTeamModal from "./component/create-team-modal/CreateTeamModal";
import HostTeam from "./component/host-team/HostTeam";
import SearchTeam from "./component/search-team/SearchTeam";
import "./TeamComponent.css";

const TeamComponent = () =>{

    const [openModal, setOpenModal] = useState(false);
    const modalBackground = useRef();

    
    
    return(
        <section id="team-page">
            <div className="left">
                <HostTeam setOpenModal={setOpenModal}/>
                <AffiliatedTeam/>
            </div>
            <div className="right">
                <SearchTeam/>
            </div>

            {openModal && 
                <CreateTeamModal setOpenModal={setOpenModal} modalBackground={modalBackground}/>
            }
        </section>
    )
} 

export default TeamComponent;