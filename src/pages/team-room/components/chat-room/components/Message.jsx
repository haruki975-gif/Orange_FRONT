import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize';


const Message = ({message, userNo, sendJsonMessage }) =>{

    const {id} = useParams("id");
    const [openOptionModal, setOpenOptionModal] = useState(false);
    const [openOptionBtn, setOpenOptionBtn] = useState(false);
    const [openUpdateForm, setOpenUpdateForm] = useState(false);
    const [updateMessage, setUpdateMessage] = useState(message.content);
    const updateForm = useRef();

    

    // 날짜 문자 형식 변환
    const changeDate = (date) =>{
        return date.replace("T", " ").slice(0, 16);
    }

    const setOpenOptionBtnHandler = (senderNo) =>{
        if(senderNo != userNo){
            return;
        }
        setOpenOptionBtn(true);
    }

    const setOpenOptionHandler = (senderNo) =>{
        if(senderNo != userNo){
            return;
        }
        setOpenOptionModal(true);
    }

    // 메시지 수정 요청
    const updateMessageHandler = () =>{

         const updateMessageRequest ={
            messageId: message.messageId,
            content: updateMessage,
            teamId: id,
            senderNo: userNo,
            type: "update" 
        }

        sendJsonMessage(updateMessageRequest);
        setOpenUpdateForm(false);
    }

    // 메시지 삭제 요청
    const deleteMessageHandler = () =>{

         const deleteMessageRequest ={
            messageId: message.messageId,
            teamId: id,
            senderNo: userNo,
            type: "delete" 
        }

        sendJsonMessage(deleteMessageRequest);
        setOpenUpdateForm(false);
    }

    // 수정 태그 포커스
    const updateFormFocus = () => {
        setUpdateMessage(message.content);
        setTimeout(() => {
            updateForm.current?.focus();
        }, 0); // 렌더링 이후 실행되게
    };


    return(
        <div className="message" onMouseEnter={() => {setOpenOptionBtnHandler(message.senderNo)}}
                                 onMouseLeave={() => {setOpenOptionBtn(false)}}>
                <div className="sender-profile">
                    <img src="/img/icon/person-fill.png" alt="" />
                </div>
                <div className="txt-box">
                    <div className="sender">
                        <p className="sender-name">{message.senderName}</p>
                        <p className="sent-date">{changeDate(message.sentDate)}</p>
                        {openOptionBtn && (
                            <div className="options-btn" 
                                onClick={() => {setOpenOptionHandler(message.senderNo)}} 
                                onMouseLeave={() => {setOpenOptionModal(false)}}
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                                {openOptionModal && 
                                    <div className="option-modal">
                                        <div className="update-option"
                                            onClick={() => {setOpenUpdateForm(true);
                                                            updateFormFocus();
                                            }}>수정하기</div>
                                        <div className="detail-option"
                                            onClick={() => deleteMessageHandler()}>삭제하기</div>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                    {openUpdateForm ? (
                        <form className="update-form" >
                            <TextareaAutosize
                                ref={updateForm}
                                minRows={1}
                                maxRows={6}
                                className="update-textarea"
                                value={updateMessage}
                                onChange={(e)=>{setUpdateMessage(e.target.value)}}
                                onKeyDown={(e) => e.ctrlKey && e.key === "Enter" && updateMessageHandler()}
                                onBlur={()=>{setOpenUpdateForm(false);
                                }}
                            />
                        </form>
                        
                    ) : (
                        <pre className="message-content">{message.content}</pre>
                    )}
                    
                </div>
        </div>
    )
}

export default Message;