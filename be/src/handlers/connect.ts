import { Handler } from "aws-lambda";
import AWS from "aws-sdk";

const ddb = new AWS.DynamoDB.DocumentClient({ endpoint: process.env.NODE_ENV === "local" ? new AWS.Endpoint('http://localhost:8000') : undefined });

const handler: Handler = async function (event, context) {
  try {
    await ddb
      .put({
        TableName: process.env.table,
        Item: {
          connectionId: event.requestContext.connectionId,
        },
      })
      .promise();
  } catch (err) {
    return {
      statusCode: 500,
    };
  }
  return {
    statusCode: 200,
  };
};

export default handler;
