
import { useContext, useEffect, useRef, useState } from "react";
import "./ChatRoom.css";
import TextareaAutosize from 'react-textarea-autosize';
import { useOutletContext, useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { AlertContext } from "../../../../components/context/AlertContext";
import axios from "axios";
import Message from "./components/Message";

const ChatRoom = () => {

<<<<<<< HEAD
    const chatList = [
        {
            sender: "홍길동",
            date: "06/19 20:32",
            content: "화면 디자인 구현할 때 \n 가나다라마바사 아자차카타파하 \n 야호야호야호야호야호얗오햐오ㅑㅎ오햐ㅗ\n크크크크크크크크크 크크크ㅡ크",
        },
        {
            sender: "홍길동",
            date: "06/19 20:32",
            content: "화면 디자인 구현할 때 \n 가나다라마바사 아자차카타파하 \n 야호야호야호야호야호얗오햐오ㅑㅎ오햐ㅗ\n크크크크크크크크크 크크크ㅡ크",
        },
        {
            sender: "홍길동",
            date: "06/19 20:32",
            content: "화면 디자인 구현할 때 \n 가나다라마바사 아자차카타파하 \n 야호야호야호야호야호얗오햐오ㅑㅎ오햐ㅗ\n크크크크크크크크크 크크크ㅡ크",
        },
        {
            sender: "홍길동",
            date: "06/19 20:32",
            content: "화면 디자인 구현할 때 \n 가나다라마바사 아자차카타파하 \n 야호야호야호야호야호얗오햐오ㅑㅎ오햐ㅗ\n크크크크크크크크크 크크크ㅡ크",
        },
        {
            sender: "홍길동",
            date: "06/19 20:32",
            content: "화면 디자인 구현할 때 \n 가나다라마바사 아자차카타파하 \n 야호야호야호야호야호얗오햐오ㅑㅎ오햐ㅗ\n크크크크크크크크크 크크크ㅡ크",
        },
        {
            sender: "홍길동",
            date: "06/19 20:32",
            content: "화면 디자인 구현할 때 \n 가나다라마바사 아자차카타파하 \n 야호야호야호야호야호얗오햐오ㅑㅎ오햐ㅗ\n크크크크크크크크크 크크크ㅡ크",
        },
        {
            sender: "홍길동",
            date: "06/19 20:32",
            content: "화면 디자인 구현할 때 \n 가나다라마바사 아자차카타파하 \n 야호야호야호야호야호얗오햐오ㅑㅎ오햐ㅗ\n크크크크크크크크크 크크크ㅡ크",
        },
        {
            sender: "홍길동",
            date: "06/19 20:32",
            content: "화면 디자인 구현할 때 \n 가나다라마바사 아자차카타파하 \n 야호야호야호야호야호얗오햐오ㅑㅎ오햐ㅗ\n크크크크크크크크크 크크크ㅡ크",
        },
    ]
=======
    const {id} = useParams("id");
    const accessToken = sessionStorage.getItem("accessToken");
    const userNo = sessionStorage.getItem("userNo");
    const wsUrl = URL_CONFIG.WS_URL + "/ws/chat/" + id + "?token=" + accessToken;
    const apiUrl = URL_CONFIG.API_URL;
    const {memberString} = useOutletContext();
>>>>>>> 9c77725eef4412d4dd9028b2a2d062f4083326f6

    const { errorAlert, successAlert } = useContext(AlertContext);

<<<<<<< HEAD
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
=======
    const [messages, setMessages] = useState([]);
    const lastTimeStampRef = useRef(null);

    const [sendMessage, setSendMessage] = useState("");

    const [isMine, setIsMine] = useState(false);

    const scrollRef = useRef();

    const [openOptionModal, setOpenOptionModal] = useState(false);
    
    // 메시지 조회 요청 함수
    const findMessages = () =>{
        if(!accessToken){
            return;
>>>>>>> 9c77725eef4412d4dd9028b2a2d062f4083326f6
        }

        console.log(lastTimeStampRef.current);

        axios.get(`${apiUrl}/api/chat?teamId=${id}&lastTimeStamp=${lastTimeStampRef.current || null}`,{
            headers : {
                Authorization : `Bearer ${accessToken}`,
            }
        }).then((response)=>{
            console.log(response.data.items[0]?.sentDate);
            console.log(response.data.items);
            setMessages(prev=> [...response.data.items, ...prev]);
            lastTimeStampRef.current = response.data.items[0]?.sentDate || lastTimeStampRef.current;
        }).catch((error)=>{
            console.log(error);
        })
    }

    // 페이지 로드 시 메시지 조회 함수 호출
    useEffect(()=>{
        findMessages();

        setIsMine(true);
    }, [id]);

    // WebSocket 연결 
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        wsUrl,
        {
            onOpen: () => successAlert("채팅방 연결에 성공하였습니다."),
            onClose: () => console.log("채팅방 연결이 종료되었습니다."),
            shouldReconnect: (closeEvent) => true,
            reconnectAttempts: 3,
            reconnectInterval: 3000,
            
            onBeforeOpen: (instance) => {
                if(!accessToken){
                    instance.close();
                    return false;
                }
                alert('123');
                return true;
            },
        }
    );

    const status = {
        [WebSocket.CONNECTING]: "연결 중...",
        [WebSocket.OPEN]: "연결됨",
        [WebSocket.CLOSING]: "연결 종료 중...",
        [WebSocket.CLOSED]: "연결 종료됨"
    }[readyState]

    // 메시지 전송
    const sendMessageHandler = () =>{

        const sendMessageRequest ={
            content: sendMessage,
            teamId: id,
            senderNo: userNo,
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

        console.log(lastJsonMessage.type);

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
                if(lastJsonMessage.senderNo == userNo){
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
    useEffect(() => {

        const element = scrollRef.current;

        const handleScroll = () => {

            const { scrollTop } = element;

            if (scrollTop == 0) {
                findMessages();
            }
        };

        element.addEventListener("scroll", handleScroll);
        return () => element.removeEventListener("scroll", handleScroll);
    }, []);

<<<<<<< HEAD
    return (
=======

    return(
>>>>>>> 9c77725eef4412d4dd9028b2a2d062f4083326f6
        <div className="chat-room" ref={scrollRef}>
            {messages.map(message => (
                <Message message={message} 
                    id={id} userNo={userNo} 
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