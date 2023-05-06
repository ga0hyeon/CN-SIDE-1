import { useCallback, useState } from "react";
import useWebSocket, { Status } from "../hooks/UseWebSocket";

const ChatSample = () => {
  const [chatList, setChatList] = useState<string[]>([]);
  const [chat, setChat] = useState<string>("");

  const PROD_URL = "wss://dvad2r3s39.execute-api.ap-northeast-2.amazonaws.com/production";
  const LOCAL_URL = "ws://localhost:1234"

  const messageHandler = useCallback((message: string) => {
    console.log("메시지 도착 >>>", message)
    setChatList(prev => [...prev, message])
  }, [])

  const closeHandler = useCallback(() => {
    alert("연결 끊어짐")
  }, [])

  const { sendMessage, status } = useWebSocket(
    {
      url: LOCAL_URL,
      onMessage: messageHandler,
      onClose: closeHandler
    }
  )

  return (
    <div>
      {chatList.map((chat) => {
        return <div>{chat}</div>;
      })}
      <div>{status.toString()}</div>
      <div>
        <input
          value={chat}
          onChange={(e) => {
            setChat(e.target.value);
          }}
          type="text"
          placeholder="대화 내용을 입력하세요"
        ></input>
        <button onClick={() => sendMessage(chat)}>SEND</button>
      </div>
    </div>
  );
};

export default ChatSample;
