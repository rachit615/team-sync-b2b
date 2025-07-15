import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AvatarGroup from "../Common/AvatarGroup/AvatarGroup";

const TaskCard = ({ task }: any) => {
  return (
    <View style={styles.card}>
      {/* Top Row: Date and Priority */}
      <View style={styles.rowBetween}>
        <View style={styles.rowCenter}>
          <Ionicons name="flag-outline" size={16} color="#6B7280" />
          <Text style={styles.dateText}>{task.date}</Text>
        </View>
        <View
          style={[styles.priorityBadge, styles[task.priority.toLowerCase()]]}
        >
          <Text style={styles.priorityText}>{task.priority}</Text>
        </View>
      </View>

      {/* Assigned User */}
      <View style={[styles.rowCenter, { marginVertical: 8 }]}>
        {/* <Image
          source={require("./assets/avatar-placeholder.png")}
          style={styles.avatar}
        /> */}
        <Text style={styles.assigneeText}>{task.assignee}</Text>
      </View>

      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {task.description}
      </Text>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${task.progress}%` }]} />
        <Text style={styles.progressText}>{task.progress}%</Text>
      </View>

      <View style={styles.bottomRow}>
        <AvatarGroup members={task.members} />

        <View style={styles.rowCenter}>
          <View style={styles.iconBadge}>
            <Ionicons name="document-outline" size={16} color="#4B5563" />
            <Text style={styles.iconText}>{task.files}</Text>
          </View>
          <View style={[styles.iconBadge, { marginLeft: 12 }]}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={16}
              color="#4B5563"
            />
            <TouchableOpacity onPress={() => router.push("/(tasks)/comments")}>
              <Text style={styles.iconText}>{task.comments}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginVertical: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#6B7280",
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  high: {
    backgroundColor: "#FECACA",
  },
  medium: {
    backgroundColor: "#FEF3C7",
  },
  low: {
    backgroundColor: "#D1FAE5",
  },
  urgent: {
    backgroundColor: "#E0E7FF",
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  assigneeText: {
    fontSize: 13,
    color: "#374151",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 2,
    color: "#111827",
  },
  description: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 10,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 10,
    position: "relative",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#3B82F6",
  },
  progressText: {
    position: "absolute",
    right: 0,
    top: -18,
    fontSize: 12,
    fontWeight: "500",
    color: "#374151",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatarGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
  },
  moreAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10,
  },
  moreText: {
    fontSize: 10,
    color: "#374151",
  },
  iconBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#4B5563",
  },
});
