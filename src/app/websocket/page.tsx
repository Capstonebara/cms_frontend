"use client";

import { useEffect, useState } from "react";

interface WebSocketProps {
  deviceId: string;
}

const WebSocketComponent = ({ deviceId }: WebSocketProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:5500/logs/jetson-1`);

    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send("ping");
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Logs from {deviceId}</h2>
      <div>{messages}</div>
      <button onClick={() => socket?.send("ping")}>Send Ping</button>
    </div>
  );
};

export default WebSocketComponent;
