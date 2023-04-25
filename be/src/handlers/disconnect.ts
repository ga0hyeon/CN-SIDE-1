import { Handler } from "aws-lambda";

export const disconnectHandler : Handler = async () => {
    console.log('user disconnected');
    
    return "OK";
};