import { Handler } from "aws-lambda";
import AWS from "aws-sdk";

const handler: Handler = async function (event, context) {
  let connectionInfo: any;
  let connectionId = event.requestContext.connectionId;

  const callbackAPI = new AWS.ApiGatewayManagementApi({
    apiVersion: "2018-11-29",
    endpoint:
      event.requestContext.domainName + "/" + event.requestContext.stage,
  });

  try {
    connectionInfo = await callbackAPI
      .getConnection({ ConnectionId: event.requestContext.connectionId })
      .promise();
  } catch (e) {
    console.log(e);
  }

  connectionInfo.connectionID = connectionId;

  await callbackAPI
    .postToConnection({
      ConnectionId: event.requestContext.connectionId,
      Data:
        "Use the sendmessage route to send a message. Your info:" +
        JSON.stringify(connectionInfo),
    })
    .promise();

  return {
    statusCode: 200,
  };
};

export default handler;
