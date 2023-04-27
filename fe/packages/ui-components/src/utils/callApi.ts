export const connect = (url: string, handler: (message: string) => void) => {
  const socket = new WebSocket(url);

  socket.addEventListener("message", ({ data }) => {
    handler(data);
  });

  return socket;
};

export const sendMessage = (socket: WebSocket, message: string) => {
  const body = JSON.stringify({
    action: "sendmessage",
    message,
  });

  console.log(body);

  socket.send(body);
};
