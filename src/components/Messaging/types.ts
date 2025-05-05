export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  attachments?: string[];
  isRead: boolean;
}

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface Conversation {
  id: string;
  participants: Participant[];
  messages: Message[];
  lastMessage: Message;
  unreadCount: number;
  isArchived: boolean;
}

export interface WebSocketMessage {
  type: 'new_message' | 'appointment_request' | 'read_status' | 'typing_status';
  data: {
    conversationId: string;
    message?: Message;
    isTyping?: boolean;
  };
} 