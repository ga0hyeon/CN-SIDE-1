import AWS from "aws-sdk";
import { Handler } from "aws-lambda";
import { WebSocketServer } from "ws";

const ddb = new AWS.DynamoDB.DocumentClient();

const handler: Handler = async (event, context) => {
  const message = JSON.parse(event.body).message;

  if (process.env.NODE_ENV === "local") {
    ((context as any).server as WebSocketServer).clients.forEach(client => {
      // NOTE : 아래 조건이 없으면 나를 포함한 모든 클라이언트에게 메시지를 전달합니다.
      if ((context as any).socket != client) {
        client.send(message)
      }
    })
  } else {
    // NOTE : AWS Lambda 환경에서는 현재 붙어있는 모든 연결에 대한 정보를 가져올 수 있는 방법이 없기 때문에
    //        DynamoDB에 연결 정보를 저장하고, 이를 통해 연결된 모든 클라이언트에게 메시지를 전달합니다.
    let connections;
    try {
      connections = await ddb
        .scan({ TableName: "chromeSide-board-ConnectionsTable-NWDEFXP6BQTA" })
        .promise();
    } catch (err) {
      return {
        statusCode: 500,
      };
    }
    const callbackAPI = new AWS.ApiGatewayManagementApi({
      apiVersion: "2018-11-29",
      endpoint:
        event.requestContext.domainName + "/" + event.requestContext.stage,
    });

    const sendMessages = connections.Items.map(async ({ connectionId }) => {
      // NOTE : 아래 조건이 없으면 나를 포함한 모든 클라이언트에게 메시지를 전달합니다.
      if (connectionId !== event.requestContext.connectionId) {
        try {
          await callbackAPI
            .postToConnection({ ConnectionId: connectionId, Data: message })
            .promise();
        } catch (e) {
          console.log(e);
        }
      }
    });

    try {
      await Promise.all(sendMessages);
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
      };
    }
  }
  return { statusCode: 200 };
}

export default handler;
