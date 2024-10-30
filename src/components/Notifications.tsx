import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import NotificationsIcon from '@mui/icons-material/Notifications';
import classNames from 'classnames';

// Helper function to format time
const formatTime = (timestamp: string | number | Date) => {
  const now = new Date();
  const notificationTime = new Date(timestamp);
  const diffInSeconds = (now - notificationTime) / 1000;

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return days === 1 ? 'Yesterday' : `${days} days ago`;
  } else {
    return notificationTime.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
};

const Notifications = () => {
  // Sample notifications data with timestamps
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New crime report added near Downtown Kigali.', isRead: true, timestamp: new Date().getTime() - 60000 }, // 1 minute ago
    { id: 2, message: 'Central Market Area crime hotspot severity updated.', isRead: false, timestamp: new Date().getTime() - 3600000 }, // 1 hour ago
    { id: 3, message: 'System maintenance scheduled for tomorrow.', isRead: true, timestamp: new Date().getTime() - 86400000 * 2 }, // 2 days ago
    { id: 4, message: 'Central Market Area crime hotspot severity updated.', isRead: false, timestamp: new Date().getTime() - 360000 },
  ]);

  const [isVisible, setIsVisible] = useState(false);

   const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  // Mark individual notification as read
  const markAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };  
  // Mark all notifications as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
  };

  // Toggle visibility of the notifications component
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      {/* Notifications Icon */}
      <button onClick={toggleVisibility} className="relative w-[20px] bg-inherit m-0 p-0 ">
        <NotificationsIcon className="text-yellow-500 text-4xl" />
        {notifications.some(notification => !notification.isRead) && (
                  <span className="absolute top-0 text-white text-center text-sm left-4 w-5 h-5 bg-red-600 rounded-full">{ unreadCount}</span>
        )}
      </button>

      {isVisible && (
        <div className="absolute right-0 mt-2 max-h-[450px] overflow-y-auto w-80 bg-white rounded-lg shadow-lg z-50 p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button onClick={toggleVisibility} className="text-gray-500">
              <FiX size={20} />
            </button>
          </div>

          {/* Notifications List */}
          <ul className="space-y-2">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={classNames(
                  'p-2 rounded-md',
                  notification.isRead ? 'bg-gray-200' : 'bg-blue-100 cursor-pointer'
                )}
              >
                <p className={notification.isRead ? 'text-gray-500' : 'text-gray-800'}>
                  {notification.message}
                </p>
                <small className="text-gray-400">
                  {formatTime(notification.timestamp)}
                </small>
              </li>
            ))}
          </ul>

          {/* Mark All as Read Button */}
          {unreadCount>0 &&
            <button
            onClick={markAllAsRead}
            className="mt-4 w-full text-sm text-white bg-primaryBackground p-2 rounded-md hover:bg-blue-600"
          >
            Mark All as Read
          </button>
          }
        </div>
      )}
    </div>
  );
};

export default Notifications;
