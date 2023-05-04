import { config } from "dotenv";
import connectHandler from "./handlers/connect";
import disconnectHandler from "./handlers/disconnect";
import sendMessageHandler from "./handlers/sendMessage";
import defaultHandler from "./handlers/default";

config({ path: `./env.${process.env.NODE_ENV}` });

import { WebSocketServer } from "ws";

const mockContext = {} as any;
const mockCallback = (error?: Error | string | null, result?: any) => { };

const server = new WebSocketServer({ port: 1234 });

server.on("connection", (socket) => {
  connectHandler({ body: { action: "$connect" } }, mockContext, mockCallback);

  socket.on("message", (data) => {
    let packet: any = null;

    try {
      packet = JSON.parse(data.toString());
    } catch (err) {
      console.log("error >>>", data, "error : ", err)
    }

    console.log("socket.on message >>> 메시지 내용 : ", packet)

    if (packet) {
      switch (packet.action) {
        case "sendmessage":
          socket.emit("message", JSON.stringify({ action: "emit-sendmessage", data: packet.message }))
          socket.send(packet.message)
          // socket.send(
          //   JSON.stringify({ action: "sendmessage", data: packet.message }))
          // sendMessageHandler(
          //   { body: { action: packet.type, data: packet.message } },
          //   mockContext,
          //   mockCallback
          // );
          break;
        default:
          defaultHandler(
            {
              body: { action: "$default" },
            },
            mockContext,
            mockCallback
          );
      }
    }
  });

});

server.on("close", () => {
  disconnectHandler(
    { body: { action: "$disconnect" } },
    mockContext,
    mockCallback
  );
});
