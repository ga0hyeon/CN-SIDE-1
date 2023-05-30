import { useCallback, useEffect, useRef, useState } from "react";

export interface SendResult {
    status: "OK" | "ERROR"
    data: string | null;
}

export interface ConnectionRequest {
    url: string,
    onOpen?: () => void,
    onClose?: () => void,
    onMessage?: (data: string) => void
}

export enum Status {
    CLOSED = "CLOSED",
    CLOSING = "CLOSING",
    CONNECTING = "CONNECTING",
    OPEN = "OPEN",
}

const useWebSocket = ({ url, onOpen, onClose, onMessage }: ConnectionRequest) => {
    const [status, setStatus] = useState<Status>(Status.CONNECTING)
    const connection = useRef<WebSocket>();

    useEffect(() => {
        if (!connection.current) {
            connection.current = new WebSocket("ws://localhost:1234");

            connection.current.addEventListener("open", () => {
                setStatus(Status.OPEN)
                onOpen && onOpen()
            });

            connection.current.addEventListener("close", () => {
                setStatus(Status.CLOSED)
                onClose && onClose()
            });

            onMessage && connection.current.addEventListener("message", ({ data }) => {
                console.log(data);
                onMessage(data)
            });

            return () => {
                if (connection.current?.readyState === WebSocket.OPEN) {
                    connection.current?.close();
                }
            };
        }
    }, []);

    const sendMessage: (action:string, data: string) => SendResult = useCallback((action:string, data: string) => {
        const result: SendResult = {
            status: "ERROR",
            data: null
        }

        if (data && connection.current) {
            connection.current?.send(
                JSON.stringify({
                    action: action,
                    message: data,
                })
            );

            result.status = "OK"
            result.data = data;
        }

        return result;
    }, []);

    return { connection: connection.current, sendMessage, status }
}

export default useWebSocket;