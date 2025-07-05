import { workspaceData } from "@/constants/data";
import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WorkspaceScreen() {
  const getStatusBG = (taskStatus: string) => {
    const bgColor =
      taskStatus === "Pending"
        ? "rgba(255, 0, 31, 0.2)"
        : "rgba(223, 132, 18, 0.2)";
    return {
      backgroundColor: bgColor,
    };
  };

  const getStatusColor = (taskStatus: string) => {
    const color =
      taskStatus === "Pending"
        ? "rgba(255, 0, 31, 1)"
        : "rgba(223, 132, 18, 1)";
    return {
      color: color,
    };
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Workspace’s</Text>
          <Entypo name="menu" size={22} />
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {["All", "Recents", "Personal", "Teams", "Assigned"].map(
            (tab, idx) => (
              <TouchableOpacity key={idx}>
                <Text
                  style={[
                    styles.tabText,
                    tab === "Recents" && styles.tabActive,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <View style={styles.section}>
          {workspaceData.featured.map((item) => (
            <View key={item.id} style={styles.featuredCard}>
              <View style={styles.cardHeader}>
                <Text>{item.priority}</Text>
                <Ionicons
                  name="ellipsis-vertical-sharp"
                  size={16}
                  color="grey"
                />
              </View>
              <Text style={styles.featuredTitle}>{item.title}</Text>
              <Text style={styles.featuredSubtitle}>in {item.category}</Text>
              <View style={styles.avatars}>
                {item.team.map((_, i) => (
                  <Text key={i} style={styles.avatar}>
                    👤
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.overviewHeader}>Project Overview (6)</Text>
          {workspaceData.projectOverview.map((item, idx) => (
            <View key={idx} style={styles.projectRow}>
              <View>
                <View style={styles.titleRow}>
                  <View style={styles.circle}></View>
                  <Text style={styles.projectTitle}>{item.title}</Text>
                </View>
                <Text style={styles.projectMeta}>
                  {item.tasks} | {item.due}
                </Text>
              </View>
              <View style={[styles.statusLabel, getStatusBG(item.status)]}>
                <Text style={getStatusColor(item.status)}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  statusLabel: {
    borderRadius: 10,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 8,
    paddingRight: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    gap: 16,
    marginVertical: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF69B4",
  },
  tabText: {
    fontSize: 14,
    color: "#999",
  },
  tabActive: {
    color: "#000",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },

  featuredCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  due: {
    color: "#666",
    fontSize: 12,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 12,
    color: "#999",
  },
  avatars: {
    flexDirection: "row",
    gap: 4,
    marginTop: 8,
  },
  avatar: {
    fontSize: 16,
  },
  overviewHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  projectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  projectTitle: {
    fontWeight: "600",
  },
  projectMeta: {
    fontSize: 12,
    color: "#666",
  },
});
