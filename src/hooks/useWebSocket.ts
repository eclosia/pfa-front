import { useState, useEffect, useCallback } from 'react';
import { WebSocketMessage } from '../Student/components/Messaging/types';

export function useWebSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connexion au WebSocket
    const ws = new WebSocket('ws://localhost:8080'); // À remplacer par votre URL WebSocket

    ws.onopen = () => {
      console.log('WebSocket connecté');
      setIsConnected(true);
    };

    ws.onclose = () => {
      console.log('WebSocket déconnecté');
      setIsConnected(false);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data) as WebSocketMessage;
      setMessages(prev => [...prev, message]);
    };

    setSocket(ws);

    // Nettoyage à la déconnexion
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message));
    }
  }, [socket, isConnected]);

  return {
    messages,
    sendMessage,
    isConnected
  };
} 