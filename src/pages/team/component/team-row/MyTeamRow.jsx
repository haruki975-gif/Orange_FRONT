

const MyTeamRow = (props) =>{

    const team = props.team;
    const index = props.index;


    return(
        <div className="team-row" key={index}>
            <div className="user">
                <div className="profile">
                    <img src="/img/icon/person-fill.png" alt="" />
                </div>
                <p className="user-name">{team.leaderName}</p>
            </div>
            <div className="team-info">
                <p className="team-name">{team.title}</p>
                <p className="team-content">{team.content}</p>
            </div>
            <p className="category">스터디</p>
            <p className="people">{team.teamMemberList.length}/4</p>
        </div>
    )
}

export default MyTeamRow;