
import { useContext, useEffect, useRef } from "react";
import "./ChatRoom.css";
import TextareaAutosize from 'react-textarea-autosize';
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { AlertContext } from "../../../../components/context/AlertContext";

const ChatRoom = () =>{

    const {id} = useParams("id");
    const wsUrl = URL_CONFIG.WS_URL + "/ws/chat/" + id;
    const { errorAlert, successAlert } = useContext(AlertContext);

    const accessToken = sessionStorage.getItem("accessToken");

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        wsUrl,
        {
            onOpen: () => console.log("채팅방 연결에 성공하였습니다."),
            onClose: () => console.log("채팅방 연결이 종료되었습니다."),
            shouldReconnect: (closeEvent) => true,
            reconnectAttempts: 3,
            reconnectInterval: 3000,
            onBeforeOpen: (instance) => {
                if(!accessToken){
                    instance.close();
                    return false;
                }
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

    useEffect(()=>{
        console.log(status);
    },[readyState])

    const chatList = [
        {
            sender : "홍길동",
            date : "06/19 20:32",
            content : "화면 디자인 구현할 때 \n 가나다라마바사 아자차카타파하 \n 야호야호야호야호야호얗오햐오ㅑㅎ오햐ㅗ\n크크크크크크크크크 크크크ㅡ크",
        },
        {
            sender : "홍길동",
            date : "06/19 20:32",
            content : "화면 디자인 구현할 때 \n 가나다라마바사 아자차카타파하 \n 야호야호야호야호야호얗오햐오ㅑㅎ오햐ㅗ\n크크크크크크크크크 크크크ㅡ크",
        },
        {
            sender : "홍길동",
            date : "06/19 20:32",
            content : "화면 디자인 구현할 때 \n 가나다라마바사 아자차카타파하 \n 야호야호야호야호야호얗오햐오ㅑㅎ오햐ㅗ\n크크크크크크크크크 크크크ㅡ크",
        },
        {
            sender : "홍길동",
            date : "06/19 20:32",
            content : "화면 디자인 구현할 때 \n 가나다라마바사 아자차카타파하 \n 야호야호야호야호야호얗오햐오ㅑㅎ오햐ㅗ\n크크크크크크크크크 크크크ㅡ크",
        },
        {
            sender : "홍길동",
            date : "06/19 20:32",
            content : "화면 디자인 구현할 때 \n 가나다라마바사 아자차카타파하 \n 야호야호야호야호야호얗오햐오ㅑㅎ오햐ㅗ\n크크크크크크크크크 크크크ㅡ크",
        },
        {
            sender : "홍길동",
            date : "06/19 20:32",
            content : "화면 디자인 구현할 때 \n 가나다라마바사 아자차카타파하 \n 야호야호야호야호야호얗오햐오ㅑㅎ오햐ㅗ\n크크크크크크크크크 크크크ㅡ크",
        },
        {
            sender : "홍길동",
            date : "06/19 20:32",
            content : "화면 디자인 구현할 때 \n 가나다라마바사 아자차카타파하 \n 야호야호야호야호야호얗오햐오ㅑㅎ오햐ㅗ\n크크크크크크크크크 크크크ㅡ크",
        },
        {
            sender : "홍길동",
            date : "06/19 20:32",
            content : "화면 디자인 구현할 때 \n 가나다라마바사 아자차카타파하 \n 야호야호야호야호야호얗오햐오ㅑㅎ오햐ㅗ\n크크크크크크크크크 크크크ㅡ크",
        },
    ]

    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, []);

    return(
        <div className="chat-room" ref={scrollRef}>
            {chatList.map(chat => (
                <div className="message">
                    <div className="sender-profile">
                        <img src="/img/icon/person-fill.png" alt="" />
                    </div>
                    <div className="txt-box">
                        <div className="sender">
                            <p className="sender-name">{chat.sender}</p>
                            <p className="sent-date">{chat.date}</p>
                        </div>
                        <pre className="message-content">{chat.content}</pre>
                    </div>
                </div>
            ))}
            <form className="input-message">
                <div className="textarea-wrapper">
                    <TextareaAutosize
                        minRows={1}
                        maxRows={6}
                        className="input-textarea"
                        placeholder="홍길동, 철수, 짱구, 맹구에게 메시지 보내기"
                    />
                    <button type="submit" className="submit-btn">
                        <img src="/img/icon/arrow-return-left.png" alt="" />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChatRoom;