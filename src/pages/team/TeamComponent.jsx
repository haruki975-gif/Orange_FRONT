import AffiliatedTeam from "./component/affiliated-team/AffiliatedTeam";
import HostTeam from "./component/host-team/HostTeam";
import SearchTeam from "./component/search-team/SearchTeam";
import "./TeamComponent.css";

const TeamComponent = () =>{
    return(
        <section id="team-page">
            <div className="left">
                <HostTeam/>
                <AffiliatedTeam/>
            </div>
            <div className="right">
                <SearchTeam/>
            </div>
        </section>
    )
} 

export default TeamComponent;