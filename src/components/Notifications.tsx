// import { useState } from "react";
// import { FiX } from "react-icons/fi";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import classNames from "classnames";

// // Helper function to format time
// const formatTime = (timestamp: string | number | Date) => {
//   const now: any = new Date();
//   const notificationTime: any = new Date(timestamp);
//   const diffInSeconds = (now - notificationTime) / 1000;

//   if (diffInSeconds < 60) {
//     return "Just now";
//   } else if (diffInSeconds < 3600) {
//     const minutes = Math.floor(diffInSeconds / 60);
//     return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
//   } else if (diffInSeconds < 86400) {
//     const hours = Math.floor(diffInSeconds / 3600);
//     return `${hours} hour${hours > 1 ? "s" : ""} ago`;
//   } else if (diffInSeconds < 604800) {
//     const days = Math.floor(diffInSeconds / 86400);
//     return days === 1 ? "Yesterday" : `${days} days ago`;
//   } else {
//     return notificationTime.toLocaleString("en-US", {
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   }
// };

// const Notifications = () => {
//   // Sample notifications data with timestamps
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       message: "New crime report added near Downtown Kigali.",
//       isRead: true,
//       timestamp: new Date().getTime() - 60000,
//     }, // 1 minute ago
//     {
//       id: 2,
//       message: "Central Market Area crime hotspot severity updated.",
//       isRead: false,
//       timestamp: new Date().getTime() - 3600000,
//     }, // 1 hour ago
//     {
//       id: 3,
//       message: "System maintenance scheduled for tomorrow.",
//       isRead: true,
//       timestamp: new Date().getTime() - 86400000 * 2,
//     }, // 2 days ago
//     {
//       id: 4,
//       message: "Central Market Area crime hotspot severity updated.",
//       isRead: false,
//       timestamp: new Date().getTime() - 360000,
//     },
//   ]);

//   const [isVisible, setIsVisible] = useState(false);

//   const unreadCount = notifications.filter(
//     (notification) => !notification.isRead
//   ).length;

//   // Mark individual notification as read
//   const markAsRead = (id: number) => {
//     setNotifications((prevNotifications) =>
//       prevNotifications.map((notification) =>
//         notification.id === id
//           ? { ...notification, isRead: true }
//           : notification
//       )
//     );
//   };
//   // Mark all notifications as read
//   const markAllAsRead = () => {
//     const updatedNotifications = notifications.map((notification) => ({
//       ...notification,
//       isRead: true,
//     }));
//     setNotifications(updatedNotifications);
//   };

//   // Toggle visibility of the notifications component
//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
//   };

//   return (
//     <div className="relative">
//       {/* Notifications Icon */}
//       <button
//         onClick={toggleVisibility}
//         className="relative w-[20px] bg-inherit m-0 p-0 "
//       >
//         <NotificationsIcon className="text-yellow-500 text-4xl" />
//         {notifications.some((notification) => !notification.isRead) && (
//           <span className="absolute top-0 text-white text-center text-sm left-4 w-5 h-5 bg-red-600 rounded-full">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {isVisible && (
//         <div className="absolute right-0 mt-2 max-h-[450px] overflow-y-auto w-80 bg-white rounded-lg shadow-lg z-50 p-4">
//           <div className="flex justify-between items-center mb-2">
//             <h2 className="text-lg font-semibold">Notifications</h2>
//             <button onClick={toggleVisibility} className="text-gray-500">
//               <FiX size={20} />
//             </button>
//           </div>

//           {/* Notifications List */}
//           <ul className="space-y-2">
//             {notifications.map((notification) => (
//               <li
//                 key={notification.id}
//                 onClick={() => markAsRead(notification.id)}
//                 className={classNames(
//                   "p-2 rounded-md",
//                   notification.isRead
//                     ? "bg-gray-200"
//                     : "bg-blue-100 cursor-pointer"
//                 )}
//               >
//                 <p
//                   className={
//                     notification.isRead ? "text-gray-500" : "text-gray-800"
//                   }
//                 >
//                   {notification.message}
//                 </p>
//                 <small className="text-gray-400">
//                   {formatTime(notification.timestamp)}
//                 </small>
//               </li>
//             ))}
//           </ul>

//           {/* Mark All as Read Button */}
//           {unreadCount > 0 && (
//             <button
//               onClick={markAllAsRead}
//               className="mt-4 w-full text-sm text-white bg-primaryBackground p-2 rounded-md hover:bg-blue-600"
//             >
//               Mark All as Read
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notifications;

import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import NotificationsIcon from "@mui/icons-material/Notifications";
import classNames from "classnames";
import axios from "../config/axios";
import toast from "react-hot-toast";
import { socket } from "../config/socket";

const formatTime = (timestamp: string | number | Date) => {
  const now: any = new Date();
  const notificationTime: any = new Date(timestamp);
  const diff = (now - notificationTime) / 1000;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  return notificationTime.toLocaleDateString();
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/notifications");
      setNotifications(res.data);
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

      toast(
        () => (
          <div>
            <h3 className="font-bold italic">📢 New Notification</h3>
            <p className="font-semibold">{notification.title}</p>
            <p className="text-sm text-gray-700">{notification.description}</p>
          </div>
        ),
        { duration: 5000 }
      );
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
