import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../../../components/context/AlertContext";

const AlertComponent = ({setOpenAlertModal, openAlertModal}) =>{

    const apiUrl = URL_CONFIG.API_URL;
    const { errorAlert, successAlert } = useContext(AlertContext);

    const [applicantList, setApplicantList] = useState([]);
    const [updateApplicantList, setUpdateApplicantList] = useState(true);


    useEffect(()=>{

        if(!openAlertModal){
            return;
        }

        const accessToken = sessionStorage.getItem("accessToken");

        if(!accessToken){
            errorAlert("로그인 후 이용 가능합니다.");
            return;
        }

        axios.get(`${apiUrl}/api/teams/member`,
            {
                headers : {
                    Authorization : `Bearer ${accessToken}`,
                }
            }
        ).then((response)=>{
            setApplicantList(response.data.items);
        }).catch((error)=>{
            console.log(error);
        });

    }, [openAlertModal, updateApplicantList])

    const acceptTeamJoinHandler = (requestNo, teamId, applicantNo) =>{

        const accessToken = sessionStorage.getItem("accessToken");

        if(!accessToken){
            errorAlert("로그인 후 이용 가능합니다.");
            return;
        }

        axios.post(`${apiUrl}/api/teams/join-accept`,
            {
                requestNo : requestNo,
                teamId : teamId,
                applicantNo : applicantNo
            },
            {
                headers : {
                    Authorization : `Bearer ${accessToken}`,
                }
            }
        ).then((response)=>{
            successAlert(response.data.message);
            setUpdateApplicantList(prev => !prev);
        }).catch((error)=>{
            console.log(error);
        });
    };

    const cancleTeamJoinHandler = (requestNo, teamId, applicantNo) =>{

        const accessToken = sessionStorage.getItem("accessToken");

        if(!accessToken){
            errorAlert("로그인 후 이용 가능합니다.");
            return;
        }

        axios.post(`${apiUrl}/api/teams/join-cancle`,
            {
                requestNo : requestNo,
                teamId : teamId,
                applicantNo : applicantNo
            },
            {
                headers : {
                    Authorization : `Bearer ${accessToken}`,
                }
            }
        ).then((response)=>{
            console.log(response);
            setUpdateApplicantList(prev => !prev);
        }).catch((error)=>{
            console.log(error);
        });
    };


    return(
        <div id="alert-component" 
            className={openAlertModal ? "active" : ""}>
            <div className="container">
                {applicantList.length !== 0 ?(
                    applicantList.map((applicant, index) =>(
                    <div className="request" key={index}>
                        <p className="request-type">팀신청</p>
                        <div className="request-content">
                            <p className="team-name">{applicant.teamName}</p>
                            <div className="request-user-info">
                                <img src="/img/icon/arrow-90.png" alt="" />
                                <div className="user-profile">
                                    <img src="/img/icon/person-fill.png" alt="" />
                                </div>
                                <p className="user-name">{applicant.applicantName}</p>
                            </div>
                        </div>
                        <button className="accept-btn"
                            onClick={() => acceptTeamJoinHandler(applicant.requestNo, applicant.teamId, applicant.applicantNo)}>수락</button>
                        <button className="cancle-btn"
                            onClick={() => cancleTeamJoinHandler(applicant.requestNo, applicant.teamId, applicant.applicantNo)}>거절</button>
                    </div>
                ))) : (
                    <div className="not-found-applicant">
                        <h2>신청 기록이 없습니다.</h2>
                    </div>
                ) 
                }
            </div>
            <button className="close-btn" onClick={() => setOpenAlertModal(false)}>
                <img src="/img/icon/chevron-right.png" alt="" />
            </button>
        </div>
    )
}

export default AlertComponent;