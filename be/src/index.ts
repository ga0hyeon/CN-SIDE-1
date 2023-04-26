import { config } from 'dotenv';
import { connectHandler } from './handlers/connect';
import { disconnectHandler } from './handlers/disconnect';
import { syncHandler } from './handlers/sync';

config({ path: `./env.${process.env.NODE_ENV}` });

import { WebSocketServer } from "ws";

const mockContext = {} as any;
const mockCallback = (error?: Error | string | null, result?: any) => {}

const server = new WebSocketServer({ port: +process.env.PORT });

server.on("connection", (socket) => {
  connectHandler({body: {action : "$connect"}}, mockContext,  mockCallback);

  socket.on("message", (data) => {
    const packet = JSON.parse(data.toString());

    switch (packet.type) {
      case "sync":
        syncHandler({body: {action : packet.type, data: packet.data}}, mockContext,  mockCallback);
        break;
    }
  });
});

server.on("close", () => {
  disconnectHandler({body: {action : "$disconnect"}}, mockContext,  mockCallback);
});