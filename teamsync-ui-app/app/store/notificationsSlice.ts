import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socketsService from "../services/socketService";
import { config } from "../configs/config";

const API_BASE = config().API_SERVER_URL;

export type NotificationItem = {
  _id: string;
  user: string;
  title: string;
  message?: string | null;
  type: string;
  link?: string | null;
  read: boolean;
  createdAt: string;
};

type Pagination = {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

type NotificationsState = {
  items: NotificationItem[];
  unreadCount: number;
  pagination: Pagination;
  hasMore: boolean;
  loading: boolean;
  loadingMore: boolean;
  refreshing: boolean;
  error?: string | null;
  socketBound: boolean;
};

const initialState: NotificationsState = {
  items: [],
  unreadCount: 0,
  pagination: { pageNumber: 1, pageSize: 20, totalCount: 0, totalPages: 0 },
  hasMore: true,
  loading: false,
  loadingMore: false,
  refreshing: false,
  error: null,
  socketBound: false,
};

// Helpers
const persist = async (list: NotificationItem[]) => {
  try {
    await AsyncStorage.setItem("notifications", JSON.stringify(list));
  } catch {}
};

const restore = async (): Promise<NotificationItem[] | null> => {
  try {
    const raw = await AsyncStorage.getItem("notifications");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const fetchNotificationsPage = async (pageNumber: number, pageSize: number) => {
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(
    `${API_BASE}/notifications?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    { headers: { Authorization: `Bearer ${token || ""}` } }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to fetch notifications");
  }
  return (await res.json()) as {
    notifications: NotificationItem[];
    pagination: Pagination;
  };
};

const patchMarkRead = async (id: string) => {
  const token = await AsyncStorage.getItem("accessToken");
  const res = await fetch(`${API_BASE}/notifications/${id}/read`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to mark read");
  }
  return (await res.json()) as NotificationItem;
};

export const loadInitial = createAsyncThunk(
  "notifications/loadInitial",
  async (_, { rejectWithValue }) => {
    try {
      const cached = await restore();
      const firstPage = await fetchNotificationsPage(
        1,
        initialState.pagination.pageSize
      );
      return { cached, firstPage };
    } catch (e: any) {
      return rejectWithValue(e.message || "loadInitial failed");
    }
  }
);

export const loadMore = createAsyncThunk(
  "notifications/loadMore",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { notifications: NotificationsState };
      const { pagination, hasMore } = state.notifications;
      if (!hasMore) return { notifications: [], pagination };
      const nextPage = (pagination.pageNumber || 1) + 1;
      const result = await fetchNotificationsPage(
        nextPage,
        pagination.pageSize
      );
      return result;
    } catch (e: any) {
      return rejectWithValue(e.message || "loadMore failed");
    }
  }
);

export const refresh = createAsyncThunk(
  "notifications/refresh",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchNotificationsPage(1, initialState.pagination.pageSize);
    } catch (e: any) {
      return rejectWithValue(e.message || "refresh failed");
    }
  }
);

export const markRead = createAsyncThunk(
  "notifications/markRead",
  async (id: string, { rejectWithValue }) => {
    try {
      // Optimistic update is handled in reducer; API confirms and socket updates too
      await patchMarkRead(id);
      return { _id: id };
    } catch (e: any) {
      return rejectWithValue(e.message || "markRead failed");
    }
  }
);

// Slice
const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // Socket handlers
    notificationReceived(state, action: PayloadAction<NotificationItem>) {
      const exists = state.items.some((n) => n._id === action.payload._id);
      if (!exists) {
        state.items.unshift(action.payload);
        if (!action.payload.read) state.unreadCount += 1;
        persist(state.items);
      }
    },
    notificationUpdated(
      state,
      action: PayloadAction<{ _id: string; read?: boolean }>
    ) {
      const { _id, read } = action.payload;
      const idx = state.items.findIndex((n) => n._id === _id);
      if (idx !== -1) {
        const prevRead = state.items[idx].read;
        state.items[idx] = { ...state.items[idx], ...action.payload };
        if (prevRead === false && read === true) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        persist(state.items);
      }
    },
    // Bind/unbind socket events one-time
    bindNotificationEvents(state) {
      state.socketBound = true;
    },
    unbindNotificationEvents(state) {
      state.socketBound = false;
    },
    clearAll(state) {
      state.items = [];
      state.unreadCount = 0;
      state.pagination = {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 0,
        totalPages: 0,
      };
      state.hasMore = true;
      state.loading = false;
      state.loadingMore = false;
      state.refreshing = false;
      state.error = null;
      persist([]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadInitial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadInitial.fulfilled, (state, action) => {
        state.loading = false;
        const { cached, firstPage } = action.payload as {
          cached: NotificationItem[] | null;
          firstPage: {
            notifications: NotificationItem[];
            pagination: Pagination;
          };
        };
        const items = firstPage.notifications;
        state.items = items;
        state.unreadCount = items.reduce((acc, n) => acc + (n.read ? 0 : 1), 0);
        state.pagination = firstPage.pagination;
        state.hasMore =
          firstPage.pagination.pageNumber < firstPage.pagination.totalPages;
        persist(items);
        // if desired, you can briefly display cached while first page loads; here we overwrite with fresh
      })
      .addCase(loadInitial.rejected, (state, action) => {
        state.loading = false;
        state.error = String(
          action.payload || action.error.message || "loadInitial error"
        );
      });

    builder
      .addCase(loadMore.pending, (state) => {
        state.loadingMore = true;
        state.error = null;
      })
      .addCase(loadMore.fulfilled, (state, action) => {
        state.loadingMore = false;
        const { notifications, pagination } = action.payload as {
          notifications: NotificationItem[];
          pagination: Pagination;
        };

        const seen = new Set(state.items.map((n) => n._id));
        const newOnes = notifications.filter((n) => !seen.has(n._id));
        state.items = [...state.items, ...newOnes];
        const newlyUnread = newOnes.reduce(
          (acc, n) => acc + (n.read ? 0 : 1),
          0
        );
        state.unreadCount += newlyUnread;
        state.pagination = pagination;
        state.hasMore = pagination.pageNumber < pagination.totalPages;
        persist(state.items);
      })
      .addCase(loadMore.rejected, (state, action) => {
        state.loadingMore = false;
        state.error = String(
          action.payload || action.error.message || "loadMore error"
        );
      });

    builder
      .addCase(refresh.pending, (state) => {
        state.refreshing = true;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.refreshing = false;
        const { notifications, pagination } = action.payload as {
          notifications: NotificationItem[];
          pagination: Pagination;
        };
        state.items = notifications;
        state.unreadCount = notifications.reduce(
          (acc, n) => acc + (n.read ? 0 : 1),
          0
        );
        state.pagination = pagination;
        state.hasMore = pagination.pageNumber < pagination.totalPages;
        persist(state.items);
      })
      .addCase(refresh.rejected, (state, action) => {
        state.refreshing = false;
        state.error = String(
          action.payload || action.error.message || "refresh error"
        );
      });

    builder
      .addCase(markRead.pending, (state, action) => {
        // Optimistic: set read in-place
        const id = action.meta.arg as string;
        const idx = state.items.findIndex((n) => n._id === id);
        if (idx !== -1 && state.items[idx].read === false) {
          state.items[idx].read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
          persist(state.items);
        }
      })
      .addCase(markRead.fulfilled, (state) => {
        // no-op: server will also emit notification:updated; we’re already consistent
      })
      .addCase(markRead.rejected, (state, action) => {
        state.error = String(
          action.payload || action.error.message || "markRead error"
        );
      });
  },
});

export const {
  notificationReceived,
  notificationUpdated,
  bindNotificationEvents,
  unbindNotificationEvents,
  clearAll,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;

// Socket binding helpers (dispatch-ready)
export const attachNotificationSocketHandlers =
  () => (dispatch: any, getState: any) => {
    const { socketBound } = (
      getState() as { notifications: NotificationsState }
    ).notifications;
    if (socketBound) return;

    const onNew = (n: NotificationItem) => dispatch(notificationReceived(n));
    const onUpdated = (payload: { _id: string; read?: boolean }) =>
      dispatch(notificationUpdated(payload));

    socketsService.on("notification:new", onNew);
    socketsService.on("notification:updated", onUpdated);

    dispatch(bindNotificationEvents());

    // cleanup function
    return () => {
      socketsService.off("notification:new", onNew);
      socketsService.off("notification:updated", onUpdated);
      dispatch(unbindNotificationEvents());
    };
  };
