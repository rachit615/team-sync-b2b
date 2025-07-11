import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router"; // Import router and useLocalSearchParams
import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface User {
  id: string;
  name: string;
  avatar?: string;
}

// Dummy user data - replace with your actual data source (e.g., from an API)
const allUsers: User[] = [
  { id: "1", name: "Jemal", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "2", name: "100 hatyr", avatar: undefined }, // No avatar, use initials
  { id: "3", name: "Management bolum", avatar: undefined },
  {
    id: "4",
    name: "Merdan Berdiyev",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  { id: "5", name: "Arslan", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: "6", name: "Jemal", avatar: "https://i.pravatar.cc/150?img=4" },
  {
    id: "7",
    name: "Merdan Berdiyev",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  { id: "8", name: "Perhat 99", avatar: "https://i.pravatar.cc/150?img=6" },
  { id: "9", name: "Aygul S.", avatar: "https://i.pravatar.cc/150?img=7" },
  { id: "10", name: "Serdar O.", avatar: undefined },
];

export default function TeamMembersScreen() {
  const params = useLocalSearchParams();
  // currentAssignedUsers will come as a comma-separated string if it's an array
  const initialAssignedUsersString = params.currentAssignedUsers as
    | string
    | undefined;
  console.log("initialAssignedUsersString :>> ", initialAssignedUsersString);
  const initialAssignedUsers = initialAssignedUsersString
    ? initialAssignedUsersString.split(",")
    : [];

  console.log("initialAssignedUsers :>> ", initialAssignedUsers);

  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(
    new Set(initialAssignedUsers)
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("Users"); // State for active tab

  const handleUserSelect = (user: User) => {
    const newSelectedUsers = new Set(selectedUsers);
    if (newSelectedUsers.has(user.name)) {
      newSelectedUsers.delete(user.name);
    } else {
      newSelectedUsers.add(user.name);
    }
    setSelectedUsers(newSelectedUsers);
  };

  console.log("selectedUsers :>> ", selectedUsers);

  const handleDone = () => {
    router.replace({
      pathname: "/(tasks)/createNewTask",
      params: { selectedUsers: Array.from(selectedUsers).join(",") },
    });
  };

  const getInitials = (name: string): string => {
    const parts = name.split(" ");
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerIcon}
        >
          <Ionicons name="close" size={24} color="#292A2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Team members</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="search" size={24} color="#292A2D" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {["Users", "Group", "Divisions", "Depart"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={activeTab === tab ? styles.activeTabText : styles.tabText}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* User List */}
      <ScrollView contentContainerStyle={styles.userListContentContainer}>
        {filteredUsers.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={styles.userItem}
            onPress={() => handleUserSelect(user)}
          >
            <View style={styles.avatarContainer}>
              {user.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.initialsAvatar}>
                  <Text style={styles.initialsText}>
                    {getInitials(user.name)}
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.checkboxContainer}>
              {selectedUsers.has(user.name) ? (
                <Ionicons name="checkbox-outline" size={24} color="#4577EF" />
              ) : (
                <Ionicons name="square-outline" size={24} color="#D3D3D3" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Done Button */}
      <View style={styles.doneButtonWrapper}>
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? 25 : 0, // Adjust for Android status bar
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#292A2D",
  },
  headerIcon: {
    padding: 5,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    gap: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#4577EF",
  },
  tabText: {
    color: "#555",
    fontWeight: "500",
  },
  activeTabText: {
    color: "white",
    fontWeight: "500",
  },
  userListContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f9f9f9",
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  initialsAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  initialsText: {
    color: "#4B4B4B",
    fontSize: 16,
    fontWeight: "600",
  },
  userName: {
    flex: 1,
    fontSize: 16,
    color: "#292A2D",
  },
  checkboxContainer: {
    marginLeft: "auto",
    padding: 5,
  },
  doneButtonWrapper: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "white",
    width: "100%",
    alignSelf: "center",
  },
  doneButton: {
    backgroundColor: "#4577EF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  doneButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
