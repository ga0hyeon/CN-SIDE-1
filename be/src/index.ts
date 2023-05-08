import connectHandler from "./handlers/connect";
import disconnectHandler from "./handlers/disconnect";
import sendMessageHandler from "./handlers/sendMessage";
import defaultHandler from "./handlers/default";

import { WebSocketServer } from "ws";

const mockContext = {} as any;
const mockCallback = (error?: Error | string | null, result?: any) => { };

export const server = new WebSocketServer({ port: 1234 });

server.on("connection", (socket) => {
  if (process.env.NODE_ENV === "local") {
    mockContext.server = server;
  }

  connectHandler({ body: { action: "$connect" } }, mockContext, mockCallback);

  socket.on("message", (data) => {
    if (process.env.NODE_ENV === "local") {
      mockContext.socket = socket;
    }

    let packet: any = null;

    try {
      packet = JSON.parse(data.toString());
    } catch (err) {
      console.log("error >>>", data, "error : ", err)
    }

    if (packet) {
      switch (packet.action) {
        case "sendmessage":
          sendMessageHandler(
            { "body": `{ "action": "${packet.action}", "message": "${packet.message}" }` },
            mockContext,
            mockCallback
          );
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
