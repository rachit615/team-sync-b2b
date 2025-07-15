import AvatarGroup from "@/components/Common/AvatarGroup/AvatarGroup";
import { workspaceData } from "@/constants/data";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
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
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=60",
            }}
            style={[styles.memberAvatar]}
          />
          <Text style={styles.headerTitle}>Your Workspace’s</Text>
          <Entypo name="menu" size={22} />
        </View>

        {/* Tabs */}
        <ScrollView
          style={styles.tabs}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {["All", "Recents", "Personal", "Teams", "Assigned"].map(
            (tab, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.tab, tab === "Recents" && styles.activeTabBg]}
              >
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
        </ScrollView>

        <View style={styles.section}>
          {workspaceData.featured.map((item) => (
            <View key={item.id} style={styles.featuredCard}>
              <View style={styles.cardHeader}>
                <View style={[styles.statusLabel, getStatusBG("High")]}>
                  <Text style={getStatusColor("High")}>High</Text>
                </View>
                <Ionicons
                  name="ellipsis-vertical-sharp"
                  size={16}
                  color="grey"
                />
              </View>
              <Text style={styles.featuredTitle}>{item.title}</Text>
              <Text style={styles.featuredDate}>Aug 12, 2024</Text>
              <AvatarGroup
                members={[
                  {
                    avatar:
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=60",
                  },
                  {
                    avatar:
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&q=60",
                  },
                ]}
              />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.overviewHeader}>Project Overview (6)</Text>
          {workspaceData.projectOverview.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push("/(tasks)/tasks")}
            >
              <View style={styles.projectRow}>
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
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
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
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  tab: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 10,
  },
  activeTabBg: {
    backgroundColor: "#0057FF",
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
  memberAvatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  tabText: {
    fontSize: 14,
  },
  tabActive: {
    color: "#fff",
  },
  section: {
    marginBottom: 20,
  },

  featuredCard: {
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#EEF5FD",
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
  featuredDate: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
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
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#EEF5FD",
  },
  projectTitle: {
    fontWeight: "600",
  },
  projectMeta: {
    fontSize: 12,
    color: "#666",
  },
});
