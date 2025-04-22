import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { notify } from "../utils/notifyUsers";
import notificationSound from "../utils/notifications/notificationSound.wav";
import axios from "../config/axios";

interface Notification {
  id: string;
  message: string;
}

const getSeenNotifications = (): Set<string> => {
  const seen = localStorage.getItem("seenNotifications");
  return seen ? new Set<string>(JSON.parse(seen)) : new Set<string>();
};

const setSeenNotifications = (seen: Set<string>) => {
  localStorage.setItem("seenNotifications", JSON.stringify([...seen]));
};

interface NotificationContextProps {
  children: React.ReactNode;
}

interface NotificationContextValue {
  showToast: () => void;
  refetchNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

export const NotificationProvider: React.FC<NotificationContextProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationQueue, setNotificationQueue] = useState<string[]>([]);
  const seenNotificationsRef = useRef<Set<string>>(getSeenNotifications());

  const fetchNotifications = async () => {
    try {
      const res = await axios.get<Notification[]>("/api/notifications");
      setNotifications(res.data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchNotifications();
    // Poll every 2s
    const interval = setInterval(fetchNotifications, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newNotifications = notifications.filter(
      (n) => !seenNotificationsRef.current.has(n.id)
    );

    if (newNotifications.length > 0) {
      setNotificationQueue((prev) => [
        ...prev,
        ...newNotifications.map((n) => n.message),
      ]);
      newNotifications.forEach((n) => seenNotificationsRef.current.add(n.id));
      setSeenNotifications(seenNotificationsRef.current);
    }
  }, [notifications]);

  useEffect(() => {
    if (notificationQueue.length > 0) {
      const timer = setTimeout(() => {
        const message = notificationQueue[0];
        notify(message);
        playBellSound();
        setNotificationQueue((prev) => prev.slice(1));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notificationQueue]);

  const playBellSound = () => {
    const audio = new Audio(notificationSound);
    audio.play().catch((e) => {
      console.error("Error playing sound:", e);
      console.error("Audio src:", audio.src);
    });
  };

  const showToast = () => {
    // This function is now handled by the queue system
  };

  const contextValue: NotificationContextValue = {
    showToast,
    refetchNotifications: fetchNotifications,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
