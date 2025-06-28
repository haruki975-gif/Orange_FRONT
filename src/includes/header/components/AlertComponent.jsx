import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../../../components/context/AlertContext";

const AlertComponent = ({setOpenAlertModal, openAlertModal}) =>{

    const apiUrl = URL_CONFIG.API_URL;
    const { errorAlert } = useContext(AlertContext);

    const [applicantList, setApplicantList] = useState([]);


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

    }, [openAlertModal])
    const requestList = [
        {
            teamName : "공부할사람 모여라",
            userName : "홍길동"
        },
        {
            teamName : "공부할사람 모여라",
            userName : "홍길동"
        },
        {
            teamName : "공부할사람 모여라",
            userName : "홍길동"
        },
        {
            teamName : "공부할사람 모여라",
            userName : "홍길동"
        },
    ]

    return(
        <div id="alert-component" 
            className={openAlertModal ? "active" : ""}>
            <div className="container">
                {applicantList.length !== 0 ?(
                    applicantList.map((request, index) =>(
                    <div className="request" key={index}>
                        <p className="request-type">팀신청</p>
                        <div className="request-content">
                            <p className="team-name">{request.teamName}</p>
                            <div className="request-user-info">
                                <img src="/img/icon/arrow-90.png" alt="" />
                                <div className="user-profile">
                                    <img src="/img/icon/person-fill.png" alt="" />
                                </div>
                                <p className="user-name">{request.applicantName}</p>
                            </div>
                        </div>
                        <button className="accept-btn">수락</button>
                        <button className="cancle-btn">거절</button>
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