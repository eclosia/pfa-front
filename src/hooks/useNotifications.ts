import { useState, useEffect } from 'react';

export interface Notification {
  id: string;
  type: 'message' | 'job_offer';
  title: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  link?: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Simuler la réception de notifications en temps réel
  useEffect(() => {
    // Ici, vous pourriez vous connecter à un WebSocket ou à une API
    // pour recevoir les notifications en temps réel
    const mockWebSocket = {
      onmessage: (event: any) => {
        const newNotification = JSON.parse(event.data);
        addNotification(newNotification);
      }
    };

    // Simuler quelques notifications pour le test
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'message',
        title: 'Nouveau message',
        content: 'Vous avez reçu un message de l\'Administration',
        timestamp: new Date(),
        isRead: false,
        link: '/messaging'
      },
      {
        id: '2',
        type: 'job_offer',
        title: 'Nouvelle offre d\'emploi',
        content: 'Une nouvelle offre correspond à votre profil',
        timestamp: new Date(Date.now() - 3600000),
        isRead: false,
        link: '/job-offers'
      }
    ];

    setNotifications(mockNotifications);

    // Simuler la réception d'une nouvelle notification après 5 secondes
    const timeout = setTimeout(() => {
      const newNotification: Notification = {
        id: '3',
        type: 'message',
        title: 'Nouveau message',
        content: 'Vous avez reçu un message d\'un professeur',
        timestamp: new Date(),
        isRead: false,
        link: '/messaging'
      };
      addNotification(newNotification);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prev =>
      prev.filter(n => n.id !== notificationId)
    );
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.isRead).length;
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    getUnreadCount
  };
} 