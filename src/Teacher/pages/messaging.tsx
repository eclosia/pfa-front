import { useState, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'react-feather';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: number;
  participant: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

const Messaging = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Simuler le chargement des conversations
    const mockConversations: Conversation[] = [
      {
        id: 1,
        participant: "John Doe",
        lastMessage: "Bonjour, j'ai une question sur mon projet...",
        timestamp: "10:30",
        unreadCount: 2
      },
      {
        id: 2,
        participant: "Jane Smith",
        lastMessage: "Merci pour votre retour !",
        timestamp: "Hier",
        unreadCount: 0
      }
    ];
    setConversations(mockConversations);
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      // Simuler le chargement des messages
      const mockMessages: Message[] = [
        {
          id: 1,
          sender: "John Doe",
          content: "Bonjour, j'ai une question sur mon projet...",
          timestamp: "10:30",
          isRead: true
        },
        {
          id: 2,
          sender: "Vous",
          content: "Bonjour John, comment puis-je vous aider ?",
          timestamp: "10:32",
          isRead: true
        },
        {
          id: 3,
          sender: "John Doe",
          content: "Je voudrais savoir si je peux modifier la date de soutenance...",
          timestamp: "10:33",
          isRead: false
        }
      ];
      setMessages(mockMessages);
    }
  }, [selectedConversation]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      const message: Message = {
        id: messages.length + 1,
        sender: "Vous",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="h-full flex">
      {/* Liste des conversations */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-8rem)]">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                selectedConversation === conversation.id ? 'bg-gray-50 dark:bg-gray-800' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{conversation.participant}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{conversation.lastMessage}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{conversation.timestamp}</span>
                  {conversation.unreadCount > 0 && (
                    <span className="mt-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zone de conversation */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* En-tête de la conversation */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {conversations.find(c => c.id === selectedConversation)?.participant}
              </h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "Vous" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "Vous"
                        ? "bg-primary text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs opacity-75 mt-1 block">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Zone de saisie */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <Paperclip size={20} />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <Smile size={20} />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Sélectionnez une conversation pour commencer
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messaging;
