import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper"; // Install if not already

export default function TaskDetailScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
        <Ionicons name="notifications-outline" size={22} color="#000" />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <View style={styles.row}>
          <View style={[styles.chip, { backgroundColor: "#FFD1D6" }]}>
            <Text style={[styles.chipText, { color: "#D72638" }]}>High</Text>
          </View>
          <View style={styles.assigneeChip}>
            <Text style={styles.initials}>M</Text>
            <Text style={styles.assigneeText}>Merdan K.</Text>
          </View>
        </View>

        <Text style={styles.taskTitle}>Design NFT landing page shot</Text>

        <View style={styles.dateRow}>
          <View>
            <Text style={styles.dateLabel}>Start Date</Text>
            <Text style={styles.dateText}>10.08.2023 / 10:55</Text>
          </View>
          <View>
            <Text style={styles.dateLabel}>Due Date</Text>
            <Text style={styles.dateText}>18.08.2023 / 22:00</Text>
          </View>
        </View>

        <Text style={styles.description}>
          “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut…
          <Text style={{ color: "#4577EF" }}>Read more</Text>
        </Text>

        <Text style={styles.sectionTitle}>File (2)</Text>
        <View style={styles.fileCard}>
          <View style={styles.fileIconRed}>
            <Text style={styles.fileType}>PDF</Text>
          </View>
          <View style={styles.fileInfo}>
            <Text style={styles.fileName}>New file.pdf</Text>
            <Text style={styles.fileSize}>12 MB</Text>
          </View>
          <Ionicons name="download-outline" size={20} color="#999" />
        </View>

        <View style={styles.fileCard}>
          <View style={styles.fileIconGreen}>
            <Text style={styles.fileType}>XLS</Text>
          </View>
          <View style={styles.fileInfo}>
            <Text style={styles.fileName}>Folder.xls</Text>
            <Text style={styles.fileSize}>8 MB</Text>
          </View>
          <Ionicons name="download-outline" size={20} color="#999" />
        </View>

        <Text style={styles.sectionTitle}>Progress</Text>
        <ProgressBar
          progress={0.78}
          color="#4577EF"
          style={styles.progressBar}
        />
        <Text style={styles.progressText}>78%</Text>

        <Text style={styles.sectionTitle}>Users</Text>

        <View style={styles.userRow}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=1" }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Jemal</Text>
          <View style={styles.userStatusBtn}>
            <Text style={styles.userStatusText}>It continues</Text>
          </View>
        </View>

        <View style={styles.userRow}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=2" }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Merdan Berdiy...</Text>
          <View style={[styles.userStatusBtn, { backgroundColor: "#F1F1F1" }]}>
            <Text style={{ fontSize: 12 }}>Completed</Text>
          </View>
        </View>

        <View style={styles.userRow}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=3" }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Arslan</Text>
          <View style={styles.ratingRow}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Ionicons key={i} name="star" color="#F5B500" size={14} />
            ))}
          </View>
        </View>

        <View style={styles.userRow}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=4" }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Perhat 99</Text>
          <View style={styles.userStatusBtn}>
            <Text style={styles.userStatusText}>It continues</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBtnWrapper}>
        <TouchableOpacity style={styles.completeBtn}>
          <Text style={styles.completeBtnText}>Completed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    justifyContent: "space-between",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 16, fontWeight: "600", color: "#000" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  chip: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chipText: { fontSize: 12, fontWeight: "500" },
  assigneeChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  initials: {
    width: 20,
    height: 20,
    backgroundColor: "#999",
    color: "white",
    fontSize: 10,
    borderRadius: 10,
    textAlign: "center",
    lineHeight: 20,
    marginRight: 6,
  },
  assigneeText: { fontSize: 12, fontWeight: "500" },
  taskTitle: { fontSize: 18, fontWeight: "600", marginVertical: 10 },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dateLabel: { color: "#999", fontSize: 12 },
  dateText: { color: "#333", fontSize: 13, fontWeight: "500" },
  description: { color: "#444", fontSize: 13, marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: "600", marginVertical: 10 },
  fileCard: {
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 12,
  },
  fileIconRed: {
    backgroundColor: "#FF5349",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  fileIconGreen: {
    backgroundColor: "#34C759",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  fileType: { color: "white", fontSize: 10, fontWeight: "bold" },
  fileInfo: { flex: 1 },
  fileName: { fontSize: 14, fontWeight: "500" },
  fileSize: { fontSize: 12, color: "#666" },
  progressBar: { height: 6, borderRadius: 6, marginTop: 8 },
  progressText: {
    textAlign: "right",
    marginTop: 4,
    fontSize: 12,
    color: "#666",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  switchLabel: { fontSize: 13, color: "#666" },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 10,
  },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  userName: { flex: 1, fontSize: 14 },
  userStatusBtn: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  userStatusText: { fontSize: 12, color: "#555" },
  ratingRow: { flexDirection: "row", gap: 2 },
  bottomBtnWrapper: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  completeBtn: {
    backgroundColor: "#4577EF",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  completeBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
