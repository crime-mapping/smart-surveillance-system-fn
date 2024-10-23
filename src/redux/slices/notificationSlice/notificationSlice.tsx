import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notificationsApiSlice } from "./notificationApiSlice";
import { notify } from "../../../utils/notifyUsers";

export interface Notification {
  id: string;
  message: string;
}

export interface NotificationsState {
  notificationsInfo: Notification[];
  unReadCount: number;
}

const notifications = localStorage.getItem("Notifications");
const parsedNotifications: Notification[] = notifications ? JSON.parse(notifications) : [];

const initialState: NotificationsState = {
  notificationsInfo: Array.isArray(parsedNotifications)
    ? parsedNotifications
    : [],
  unReadCount: 0,
};


const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<Notification[]>) {
      const currentNotifications = action.payload;
      
      if (Array.isArray(currentNotifications)) {
        const previousNotifications = state.notificationsInfo;
        
        // Find new notifications
        const newNotifications = currentNotifications.filter(
          (notification) =>
            !previousNotifications.some(
              (existingNotification) => existingNotification.id === notification.id
            )
        );
        
        // Notify for new notifications
        if (newNotifications.length > 0) {
          newNotifications.forEach(notification => notify(notification.message));
        }
        
        // Update state and localStorage
        state.notificationsInfo = currentNotifications;
        localStorage.setItem(
          "Notifications",
          JSON.stringify(currentNotifications)
        );
      } else {
        console.error("Expected payload to be an array but got:", currentNotifications);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      notificationsApiSlice.endpoints.getNotifications.matchFulfilled,
      (state, { payload }) => {
        // Check if payload is an array, if not, try to extract notifications from it
        const notifications = Array.isArray(payload) ? payload : payload.notifications || [];
        
        if (Array.isArray(notifications)) {
          state.notificationsInfo = notifications;
          localStorage.setItem(
            "Notifications",
            JSON.stringify(notifications)
          );
          // Notify for new notifications
          const previousNotifications = state.notificationsInfo;
          const newNotifications = notifications.filter(
            (notification) =>
              !previousNotifications.some(
                (existingNotification) => existingNotification.id === notification.id
              )
          );
          newNotifications.forEach(notification => notify(notification.message));
        } else {
          console.error("Unexpected payload structure:", payload);
        }
      }
    );
  },
});

export const { setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;