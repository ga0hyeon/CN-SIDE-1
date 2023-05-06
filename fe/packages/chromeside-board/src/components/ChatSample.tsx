import { useCallback, useState } from "react";
import useWebSocket, { Status } from "../hooks/UseWebSocket";

const ChatSample = () => {
  const [chatList, setChatList] = useState<string[]>([]);
  const [chat, setChat] = useState<string>("");

  const messageHandler = useCallback((message: string) => {
    setChatList(prev => [...prev, message])
  }, [])

  const closeHandler = useCallback(() => {
    alert("연결 끊어짐")
  }, [])

  const { sendMessage, status } = useWebSocket(
    {
      url: import.meta.env.VITE_WSS_URL || "",
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
