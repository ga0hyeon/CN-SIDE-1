import AWS from "aws-sdk";
import { Handler } from "aws-lambda";
import { WebSocketServer } from "ws";

const ddb = new AWS.DynamoDB.DocumentClient();

const handler: Handler = async (event, context) => {
  console.log(event);
  const message = JSON.parse(event.body).message;

  if (process.env.NODE_ENV === "local") {
    ((context as any).server as WebSocketServer).clients.forEach(client => client.send(message))
  } else {
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
