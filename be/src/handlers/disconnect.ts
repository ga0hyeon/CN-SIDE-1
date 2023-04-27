import { Handler } from "aws-lambda";
import AWS from "aws-sdk";

const ddb = new AWS.DynamoDB.DocumentClient();

const handler: Handler = async function (event, context) {
  await ddb
    .delete({
      TableName: process.env.table,
      Key: {
        connectionId: event.requestContext.connectionId,
      },
    })
    .promise();
  return {
    statusCode: 200,
  };
};

export default handler;
