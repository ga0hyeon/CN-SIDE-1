import { Handler } from "aws-lambda";

interface SyncEvent{
    body : {
        action : string;
        data: string;
    }
}

export const syncHandler : Handler<SyncEvent> = async ({body: {action, data}}) => {
    console.log('user disconnected', data);
    
    return "OK" ;
};