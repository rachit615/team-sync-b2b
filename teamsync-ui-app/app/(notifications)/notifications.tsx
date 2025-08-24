// screens/Notifications.tsx
import React, { useCallback } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  loadMore,
  markRead,
  refresh as refreshThunk,
} from "../store/notificationsSlice";
import dayjs from "dayjs";

export default function Notifications() {
  const dispatch = useDispatch();
  const { items, refreshing, loadingMore, hasMore } = useSelector(
    (s: RootState) => s.notifications
  );

  const onEndReached = useCallback(() => {
    if (!loadingMore && hasMore) {
      dispatch(loadMore() as any);
    }
  }, [dispatch, loadingMore, hasMore]);

  const onRefresh = useCallback(() => {
    dispatch(refreshThunk() as any);
  }, [dispatch]);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => dispatch(markRead(item._id) as any)}
      style={{
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: item.read ? "#fff" : "#F3F7FF",
      }}
    >
      <Text style={{ fontWeight: item.read ? "400" : "700", marginBottom: 4 }}>
        {item.title}
      </Text>
      {item.message ? (
        <Text style={{ color: "#555" }}>{item.message}</Text>
      ) : null}
      <Text style={{ color: "#999", fontSize: 12, marginTop: 6 }}>
        {dayjs(item.createdAt).format("MMM D, YYYY h:mm A")}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", padding: 20 }}>
        Notifications
      </Text>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(i) => i._id}
        onEndReachedThreshold={0.3}
        onEndReached={onEndReached}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={{ padding: 20 }}>
            <Text>No notifications yet</Text>
          </View>
        }
      />
    </View>
  );
}
