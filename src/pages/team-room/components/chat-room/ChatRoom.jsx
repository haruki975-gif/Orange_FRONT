
import { useContext, useEffect, useRef, useState } from "react";
import "./ChatRoom.css";
import TextareaAutosize from 'react-textarea-autosize';
import { useOutletContext, useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";

import axios from "axios";
import Message from "./components/Message";
import { GlobalContext } from "../../../../components/context/GlobalContext";

const ChatRoom = () =>{

    const {id} = useParams("id");
    const wsUrl = URL_CONFIG.WS_URL + "/ws/chat/" + id + "?token=";
    const apiUrl = URL_CONFIG.API_URL;
    const {memberString} = useOutletContext();

    const { errorAlert, successAlert, auth } = useContext(GlobalContext);

    const [messages, setMessages] = useState([]);
    const [lastTimeStamp, setLastTimeStamp] = useState(null);

    const [sendMessage, setSendMessage] = useState("");

    const [isMine, setIsMine] = useState(false);

    const scrollRef = useRef();

    // 메시지 조회 요청 함수
    const findMessages = () =>{
        if(!auth?.accessToken){
            return;
        }

        axios.get(`${apiUrl}/api/chat?teamId=${id}&lastTimeStamp=${lastTimeStamp || null}`,{
            headers : {
                Authorization : `Bearer ${auth.accessToken}`,
            }
        }).then((response)=>{
            setMessages(prev=> [...response.data.items, ...prev]);
            setLastTimeStamp(response.data.items[0]?.sentDate || lastTimeStamp);
        }).catch((error)=>{
            errorAlert(error.response.data?.message ?? "조회 실패");
        })
    };

    // 페이지 로드 시 메시지 조회 함수 호출
    useEffect(()=>{
        findMessages();

        setIsMine(true);
    }, [id]);

    // WebSocket 연결 
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        wsUrl + auth.accessToken,
        {
            onOpen: () => console.log("채팅방 연결에 성공하였습니다."),
            onClose: () => console.log("채팅방 연결이 종료되었습니다."),
            shouldReconnect: (closeEvent) => true,
            reconnectAttempts: 3,
            reconnectInterval: 3000,
            onBeforeOpen: (instance) => {
                if(!auth?.accessToken){
                    instance.close();
                    return false;
                }
                return true;
            },
        }
    );

    // 메시지 전송
    const sendMessageHandler = () =>{
        const sendMessageRequest ={
            content: sendMessage,
            teamId: id,
            senderNo: auth.userNo,
            type: "send" 
        }

        sendJsonMessage(sendMessageRequest);

        setSendMessage("");
        setIsMine(true);
    };

    // WebSocket 메시지 응답 받았을 시 
    useEffect(()=>{
        if(!lastJsonMessage){
            return;
        }

        switch(lastJsonMessage.type){
            case "send" :
                const subMessage = {...lastJsonMessage};
                delete subMessage.type;

                setMessages(prev => [...prev, subMessage]);
                break;
            case "update" :
                setMessages(prev => 
                    prev.map(msg =>
                        msg.messageId === lastJsonMessage.messageId
                        ? { ...msg, content: lastJsonMessage.content }
                        : msg
                    )
                );
                break;
            case "delete" :
                setMessages(prev =>
                    prev.filter(msg => 
                        msg.messageId !== lastJsonMessage.messageId
                    )
                );
                break;
            default :
                if(lastJsonMessage.senderNo == auth.userNo){
                    errorAlert(lastJsonMessage.type);
                }
                break;
        }

        
    }, [lastJsonMessage]);

    // 메시지 응답시 + 페이지 첫 로드시 => 스크롤 맨 아래로 이동
    useEffect(()=>{
        const element = scrollRef.current;

        const { scrollTop, scrollHeight, clientHeight } = element;


        if(scrollTop + clientHeight + 167 >= scrollHeight){
            element.scrollTop = scrollHeight;
        }
        if(isMine){
            element.scrollTop = scrollHeight;
            setIsMine(false);
        }
        
    }, [messages])

    
    // 무한 스크롤 (메시지 조회 함수 호출)
    const handleScroll = (e) => {
        const { scrollTop } = e.target;

        if (scrollTop == 0) {
            findMessages();
        }
    };


    return(
        <div className="chat-room" ref={scrollRef} onScroll={(e) => handleScroll(e)}>
            {messages.map(message => (
                <Message message={message} 
                    id={id} userNo={auth.userNo} 
                    sendJsonMessage={sendJsonMessage} />
            ))}
            <form className="input-message">
                <div className="textarea-wrapper">
                    <TextareaAutosize
                        minRows={1}
                        maxRows={6}
                        className="input-textarea"
                        placeholder={`${memberString}에게 메시지 보내기`}
                        value={sendMessage}
                        onChange={(e)=>{setSendMessage(e.target.value)}}
                        onKeyDown={(e) => e.ctrlKey && e.key === "Enter" && sendMessageHandler()}
                    />
                    <button type="button" className="submit-btn" onClick={() => sendMessageHandler()}>
                        <img src="/img/icon/arrow-return-left.png" alt="" />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChatRoom;