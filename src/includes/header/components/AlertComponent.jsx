import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../components/context/GlobalContext";
import { FaUserCircle } from "react-icons/fa";

const AlertComponent = ({setOpenAlertModal, openAlertModal, applicantList ,setUpdateApplicantList}) =>{

    const apiUrl = URL_CONFIG.API_URL;
    const { errorAlert, successAlert, auth } = useContext(GlobalContext);


    const acceptTeamJoinHandler = (applicant) =>{

        console.log(applicant);

        if(!auth?.accessToken){
            errorAlert("로그인 후 이용 가능합니다.");
            return;
        }

        axios.post(`${apiUrl}/api/teams/join-accept`,
            {
                requestNo : applicant.requestNo,
                teamId : applicant.teamId,
                applicantNo : applicant.applicantNo
            },
            {
                headers : {
                    Authorization : `Bearer ${auth.accessToken}`,
                }
            }
        ).then((response)=>{
            successAlert(response.data.message);
            setUpdateApplicantList(prev => !prev);
        }).catch((error)=>{
            errorAlert(error.response.data.message);
            setUpdateApplicantList(prev => !prev);
        });
    };

    const cancleTeamJoinHandler = (applicant) =>{

        console.log(applicant);

        if(!auth?.accessToken){
            errorAlert("로그인 후 이용 가능합니다.");
            return;
        }

        axios.delete(`${apiUrl}/api/teams/join-cancle`,
            {
                data : {
                    requestNo : applicant.requestNo,
                    teamId : applicant.teamId,
                    applicantNo : applicant.applicantNo
                },
                headers : {
                    Authorization : `Bearer ${auth.accessToken}`,
                }
            }
        ).then((response)=>{
            successAlert(response.data.message);
            setUpdateApplicantList(prev => !prev);
        }).catch((error)=>{
            errorAlert(error.response.data.message);
        })
    };


    return(
        <div id="alert-component" 
            className={openAlertModal ? "active" : ""}>
            <div className="container">
                {applicantList?.length !== 0 ?(
                    applicantList?.map((applicant, index) =>(
                    <div className="request" key={index}>
                        <p className="request-type">팀신청</p>
                        <div className="request-content">
                            <p className="team-name">{applicant.teamName}</p>
                            <div className="request-user-info">
                                <img src="/img/icon/arrow-90.png" alt="" />
                                <div className="user-profile">
                                    {applicant.applicantProfile ? (
                                            <img src={applicant.applicantProfile} alt="" />
                                        ) : (
                                            <FaUserCircle
                                                className="profile-icon"
                                            />
                                        )
                                    }
                                </div>
                                <p className="user-name">{applicant.applicantName}</p>
                            </div>
                        </div>
                        <button className="accept-btn"
                            onClick={() => acceptTeamJoinHandler(applicant)}>수락</button>
                        <button className="cancle-btn"
                            onClick={() => cancleTeamJoinHandler(applicant)}>거절</button>
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