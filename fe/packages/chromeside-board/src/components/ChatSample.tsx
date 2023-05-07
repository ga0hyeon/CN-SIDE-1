import { useCallback, useEffect, useRef, useState } from "react";

const ChatSample = () => {
  const [chatList, setChatList] = useState<string[]>([]);
  const connection = useRef<WebSocket>();

  const [chat, setChat] = useState<string>("");

  const sendMessage = useCallback((curChat: string) => {
    console.log(curChat);
    if (curChat && connection.current) {
      connection.current?.send(
        JSON.stringify({
          action: "sendmessage",
          message: curChat,
        })
      );

      setChat("");
    }
  }, []);

  useEffect(() => {
    if (!connection.current) {
      connection.current = new WebSocket(
        "wss://dvad2r3s39.execute-api.ap-northeast-2.amazonaws.com/production"
      );

      connection.current.addEventListener("message", ({ data }) => {
        console.log(data);
        setChatList((prev) => [...prev, data]);
      });

      return () => {
        if (connection.current?.readyState === 1) {
          connection.current?.close();
        }
      };
    }
  }, []);

  return (
    <div>
      {chatList.map((chat) => {
        return <div>{chat}</div>;
      })}
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
