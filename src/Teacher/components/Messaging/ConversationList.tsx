import { Conversation } from './types';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  searchQuery: string;
  filter: 'all' | 'unread' | 'archived';
}

export default function ConversationList({
  conversations,
  selectedConversation,
  onSelectConversation,
  searchQuery,
  filter
}: ConversationListProps) {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
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

  if (filteredConversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
        Aucune conversation
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {filteredConversations.map((conversation) => {
        const otherParticipant = conversation.participants.find(p => p.id !== 'currentUserId');
        return (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
              selectedConversation?.id === conversation.id
                ? 'bg-gray-100 dark:bg-gray-800'
                : ''
            }`}
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              {otherParticipant?.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {otherParticipant?.name || 'Utilisateur'}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTime(conversation.lastMessage.timestamp)}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {conversation.lastMessage.content}
              </p>
            </div>

            {conversation.unreadCount > 0 && (
              <div className="ml-2 flex-shrink-0">
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-500 rounded-full">
                  {conversation.unreadCount}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
} 