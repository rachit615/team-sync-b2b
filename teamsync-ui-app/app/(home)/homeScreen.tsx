import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ActivityFeed from "@/components/Home/ActivityFeed/activityFeed";
import Recents from "@/components/Home/Recents/recents";

function NavButton({
  title,
  icon,
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f7fa",
        borderRadius: 12,
        padding: 15,
      }}
    >
      <Ionicons
        name={icon}
        size={22}
        color="#006EE9"
        style={{ marginRight: 10 }}
      />
      <Text style={{ fontSize: 15, fontWeight: "500" }}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff", paddingTop: 20 }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text style={styles.date}>Tuesday, August 26</Text>
      <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 10 }}>
        Good morning, Rachit
      </Text>

      <View style={styles.container}>
        <ActivityFeed />
        <Recents />
      </View>

      {/* Section: My Tasks */}
      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            backgroundColor: "#f5f7fa",
            borderRadius: 12,
            padding: 20,
            alignItems: "center",
          }}
        >
          <Ionicons name="checkmark-circle-outline" size={40} color="#006EE9" />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            You’re all caught up
          </Text>
          <Text style={{ fontSize: 14, color: "#555" }}>
            on tasks due this week
          </Text>
        </View>
      </View>

      {/* Section: Comments */}
      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            backgroundColor: "#f5f7fa",
            borderRadius: 12,
            padding: 20,
            alignItems: "center",
          }}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={40}
            color="#FF6B6B"
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            Comments mentioning you
          </Text>
          <Text style={{ fontSize: 14, color: "#555", textAlign: "center" }}>
            When you’re mentioned in a comment you can reply from here.
          </Text>
        </View>
      </View>

      {/* Section: Navigation shortcuts */}
      <View style={{ flexDirection: "column", gap: 12 }}>
        <NavButton title="Projects" icon="briefcase-outline" />
        <NavButton title="Goals" icon="trophy-outline" />
        <NavButton title="Portfolios" icon="folder-outline" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
  },
  date: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
});
