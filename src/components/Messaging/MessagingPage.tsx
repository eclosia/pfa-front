import { useState, useEffect } from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';
import ConversationList from './ConversationList';
import ConversationView from './ConversationView';
import NewMessageModal from './NewMessageModal';
import AppointmentModal from './AppointmentModal';
import { Message, Conversation } from './types';

const RECIPIENT_TYPES = [
  { id: 'admin', name: 'Administration', avatar: 'user' },
  { id: 'professor', name: 'Professeur', avatar: 'user' },
  { id: 'company', name: 'Entreprise', avatar: 'user' }
];

export default function MessagingPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      participants: [
        {
          id: 'currentUserId',
          name: 'Moi',
          avatar: 'user',
          isOnline: true
        },
        {
          id: 'admin',
          name: 'Administration',
          avatar: 'user',
          isOnline: true
        }
      ],
      messages: [
        {
          id: '1',
          senderId: 'admin',
          content: 'Bonjour, comment puis-je vous aider ?',
          timestamp: new Date(),
          isRead: true
        }
      ],
      lastMessage: {
        id: '1',
        senderId: 'admin',
        content: 'Bonjour, comment puis-je vous aider ?',
        timestamp: new Date(),
        isRead: true
      },
      unreadCount: 0,
      isArchived: false
    }
  ]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');

  // WebSocket connection for real-time updates
  const { messages, sendMessage } = useWebSocket();

  // Écouter les nouveaux messages reçus
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.type === 'new_message' && lastMessage.data.message) {
        const { conversationId, message } = lastMessage.data;
        
        setConversations(prevConversations => {
          return prevConversations.map(conv => {
            if (conv.id === conversationId) {
              return {
                ...conv,
                messages: [...conv.messages, message],
                lastMessage: message,
                unreadCount: message.senderId !== 'currentUserId' ? conv.unreadCount + 1 : 0
              };
            }
            return conv;
          });
        });
      }
    }
  }, [messages]);

  const handleNewMessage = (recipientId: string, content: string, attachments?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'currentUserId',
      content,
      timestamp: new Date(),
      attachments,
      isRead: false
    };

    setConversations((prevConversations) => {
      const conversation = prevConversations.find((conv) =>
        conv.participants.some((p) => p.id === recipientId)
      );

      if (conversation) {
        return prevConversations.map((conv) =>
          conv.id === conversation.id
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
                lastMessage: newMessage,
                unreadCount: conv.unreadCount + 1,
              }
            : conv
        );
      }

      const newConversation: Conversation = {
        id: Date.now().toString(),
        participants: [
          {
            id: 'currentUserId',
            name: 'Moi',
            avatar: 'user',
            isOnline: true
          },
          { 
            id: recipientId, 
            name: 'Nouveau contact', 
            avatar: '/default-avatar.png',
            isOnline: true 
          },
        ],
        messages: [newMessage],
        lastMessage: newMessage,
        unreadCount: 1,
        isArchived: false,
      };

      return [newConversation, ...prevConversations];
    });

    if (sendMessage) {
      sendMessage({
        type: 'new_message',
        data: {
          conversationId: Date.now().toString(),
          message: newMessage
        }
      });
    }
  };

  const handleAppointmentRequest = (date: Date, time: string, notes: string) => {
    if (!selectedConversation) return;

    const formattedDate = date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const appointmentMessage: Message = {
      id: Date.now().toString(),
      senderId: 'currentUserId',
      content: `Demande de rendez-vous pour le ${formattedDate} à ${time}. Notes: ${notes}`,
      timestamp: new Date(),
      isRead: false
    };

    // Mettre à jour la conversation
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              messages: [...conv.messages, appointmentMessage],
              lastMessage: appointmentMessage,
              unreadCount: 0
            }
          : conv
      )
    );

    // Mettre à jour la conversation sélectionnée
    setSelectedConversation(prev => 
      prev ? {
        ...prev,
        messages: [...prev.messages, appointmentMessage],
        lastMessage: appointmentMessage,
        unreadCount: 0
      } : null
    );

    // Envoyer le message via WebSocket
    sendMessage({
      type: 'appointment_request',
      data: {
        conversationId: selectedConversation.id,
        message: appointmentMessage
      }
    });

    // Fermer le modal
    setIsAppointmentModalOpen(false);
  };

  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.participants.some(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesFilter = filter === 'all' ? true :
      filter === 'unread' ? conversation.unreadCount > 0 :
      conversation.isArchived;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col md:flex-row">
      {/* Sidebar des conversations */}
      <div className={`w-full md:w-80 lg:w-96 ${selectedConversation ? 'hidden md:block' : 'block'} border-r border-gray-200 dark:border-gray-700`}>
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h2>
          <button
            onClick={() => setIsNewMessageModalOpen(true)}
            className="rounded-full bg-primary p-2 text-white hover:bg-opacity-90"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <div className="flex h-14 items-center border-b border-gray-200 px-4 dark:border-gray-700">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-transparent py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:text-white"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex h-14 items-center space-x-2 border-b border-gray-200 px-4 dark:border-gray-700">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-full px-3 py-1 text-sm ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-transparent text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`rounded-full px-3 py-1 text-sm ${
              filter === 'unread'
                ? 'bg-primary text-white'
                : 'bg-transparent text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Non lus
          </button>
          <button
            onClick={() => setFilter('archived')}
            className={`rounded-full px-3 py-1 text-sm ${
              filter === 'archived'
                ? 'bg-primary text-white'
                : 'bg-transparent text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Archivés
          </button>
        </div>

        <div className="h-[calc(100vh-12rem)] overflow-y-auto">
          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={setSelectedConversation}
            searchQuery={searchQuery}
            filter={filter}
          />
        </div>
      </div>

      {/* Vue de la conversation */}
      <div className={`flex-1 ${!selectedConversation ? 'hidden md:block' : 'block'}`}>
        {selectedConversation ? (
          <ConversationView
            conversation={selectedConversation}
            onSendMessage={handleNewMessage}
            onRequestAppointment={() => setIsAppointmentModalOpen(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Aucune conversation sélectionnée</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Sélectionnez une conversation ou créez-en une nouvelle
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setIsNewMessageModalOpen(true)}
                  className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Nouveau message
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <NewMessageModal
        isOpen={isNewMessageModalOpen}
        onClose={() => setIsNewMessageModalOpen(false)}
        onSendMessage={handleNewMessage}
        recipientTypes={RECIPIENT_TYPES}
      />

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        onRequestAppointment={handleAppointmentRequest}
      />
    </div>
  );
} 