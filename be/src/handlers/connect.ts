import { Handler } from "aws-lambda";

export const connectHandler : Handler = async () => {
    console.log('user connected');
    
    return "OK";
};