import { config } from "dotenv";
import connectHandler from "./handlers/connect";
import disconnectHandler from "./handlers/disconnect";
import sendMessageHandler from "./handlers/sendMessage";
import defaultHandler from "./handlers/default";

config({ path: `./env.${process.env.NODE_ENV}` });

import { WebSocketServer } from "ws";

const mockContext = {} as any;
const mockCallback = (error?: Error | string | null, result?: any) => {};

const server = new WebSocketServer({ port: 1234 });

server.on("connection", (socket) => {
  connectHandler({ body: { action: "$connect" } }, mockContext, mockCallback);

  socket.on("message", (data) => {
    const packet = JSON.parse(data.toString());

    switch (packet.action) {
      case "sendmessage":
        sendMessageHandler(
          { body: { action: packet.type, data: packet.data } },
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
  });
});

server.on("close", () => {
  disconnectHandler(
    { body: { action: "$disconnect" } },
    mockContext,
    mockCallback
  );
});
