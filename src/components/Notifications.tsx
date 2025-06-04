import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import NotificationsIcon from "@mui/icons-material/Notifications";
import classNames from "classnames";
import axios from "../config/axios";
import { socket } from "../config/socket";
import notificationSound from "../utils/notifications/notificationsound2.wav";
import { toast } from "react-toastify";

const formatTime = (timestamp: string | number | Date) => {
  const now = new Date();
  const notificationTime = new Date(timestamp);
  const diffInSeconds = Math.floor(
    (now.getTime() - notificationTime.getTime()) / 1000
  );

  const pluralize = (value: number, unit: string) =>
    `${value} ${unit}${value !== 1 ? "s" : ""} ago`;

  if (diffInSeconds < 60) return "Just now";

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return pluralize(minutes, "minute");

  const hours = Math.floor(diffInSeconds / 3600);
  if (hours < 24) return pluralize(hours, "hour");

  const days = Math.floor(diffInSeconds / 86400);
  if (days < 7) return pluralize(days, "day");

  const weeks = Math.floor(diffInSeconds / 604800);
  if (weeks < 4) return pluralize(weeks, "week");

  const months = Math.floor(diffInSeconds / 2592000);
  if (months < 12) return pluralize(months, "month");

  const years = Math.floor(diffInSeconds / 31536000);
  return pluralize(years, "year");
};

const playBellSound = () => {
  const audio = new Audio(notificationSound);
  audio.play().catch((e) => {
    console.error("Error playing sound:", e);
    console.error("Audio src:", audio.src);
  });
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/notifications");
      const data = res.data;
      setNotifications(data);
      // Determine last login
      const lastLoginStr = localStorage.getItem("lastLogin");
      const lastLogin = lastLoginStr ? new Date(lastLoginStr) : null;

      if (lastLogin) {
        const newUnreadNotifications = data.filter(
          (n: any) => !n.isRead && new Date(n.timestamp) > lastLogin
        );

        // Delay each toast by 1s
        newUnreadNotifications.forEach((n: any, i: any) => {
          setTimeout(() => {
            playBellSound();
            toast(
              <div>
                <h3 className="font-bold italic">📢 New Notification</h3>
                <p className="font-semibold">{n.title}</p>
                <p className="text-sm text-gray-700">{n.description}</p>
              </div>
            );
          }, i * 1000);
        });

        if (newUnreadNotifications.length > 0) {
          const latest = newUnreadNotifications[0].timestamp;
          localStorage.setItem("lastLogin", new Date(latest).toISOString());
        }
      }
    } catch (error) {
      console.error("❌ Error fetching notifications:", error);
    }
  };

  const markAsRead = async (id: string) => {
    await axios.patch(`/notifications/${id}/read`);
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = async () => {
    await axios.patch("/notifications/mark-all-read");
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    fetchNotifications();

    socket.on("new-notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      playBellSound();
      toast.info(() => (
        <div>
          <h3 className="font-bold italic">📢 New Notification</h3>
          <p className="font-semibold">{notification.title}</p>
          <p className="text-sm text-gray-700">{notification.description}</p>
        </div>
      ));
    });

    return () => {
      socket.off("new-notification");
    };
  }, []);

  return (
    <div className="relative">
      <button onClick={toggleVisibility} className="relative w-[20px]">
        <NotificationsIcon className="text-yellow-500 text-4xl" />
        {unreadCount > 0 && (
          <span className="absolute top-0 left-4 w-5 h-5 bg-red-600 text-white text-center text-sm rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isVisible && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 p-4 max-h-[450px] overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button onClick={toggleVisibility}>
              <FiX size={20} className="text-gray-500" />
            </button>
          </div>
          <ul className="space-y-2">
            {notifications.length == 0 && (
              <h3 className="italic">No new notifications</h3>
            )}
            {notifications.map((n) => (
              <li
                key={n._id}
                onClick={() => markAsRead(n._id)}
                className={classNames(
                  "p-2 rounded-md",
                  n.isRead ? "bg-gray-200" : "bg-blue-100 cursor-pointer"
                )}
              >
                <p className={n.isRead ? "text-gray-500" : "text-gray-800"}>
                  {n.title}
                </p>
                <small className="text-gray-400">
                  {formatTime(n.timestamp)}
                </small>
              </li>
            ))}
          </ul>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="mt-4 w-full text-sm text-white bg-blue-600 p-2 rounded-md"
            >
              Mark All as Read
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
