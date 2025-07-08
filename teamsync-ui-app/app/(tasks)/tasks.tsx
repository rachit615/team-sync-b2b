import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TabMenuProps } from "@/interfaces/interface";
import TaskCard from "@/components/Task/TaskCard";
import Button from "@/components/Common/Button/Button";

const tabData = [
  {
    label: "All Tasks",
    value: "allTasks",
  },
  {
    label: "My Tasks",
    value: "myTasks",
  },
];

interface TabMenuProps {
  tabs: typeof tabData;
  selectedTab: string;
  onTabPress: (value: string) => void;
}

const TabMenu = ({ tabs, selectedTab, onTabPress }: TabMenuProps) => {
  return tabs.map((tab, index: number) => {
    const isActive = selectedTab === tab.value;

    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.7}
        onPress={() => onTabPress(tab.value)}
        style={{ flex: 1 }}
      >
        <View style={[styles.tab, isActive && styles.activeTab]}>
          <Text style={[styles.tabText, isActive && styles.activeTabText]}>
            {tab.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });
};

export default function TasksScreen() {
  const [selectedTab, setSelectedTab] = useState("allTasks");
  const tasks = [
    {
      date: "13.08.2023 / 10:55",
      priority: "High",
      assignee: "Merdan K.",
      title: "Design NFT landing page shot",
      description:
        "Design a simple home pages with clean layout and color based on the guidelin to...",
      progress: 78,
      files: 5,
      comments: 8,
      members: [
        {
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=60",
        },
        {
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&q=60",
        },
        {
          avatar:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=60&q=60",
        },
      ],
    },
  ];

  return (
    <View
      style={{
        padding: 20,
        position: "relative",
        height: "100%",
      }}
    >
      <View style={styles.tabContainer}>
        <TabMenu
          tabs={tabData}
          selectedTab={selectedTab}
          onTabPress={(value) => setSelectedTab(value)}
        />
      </View>
      <Text style={{ marginTop: 20 }}>Current tab: {selectedTab}</Text>
      <TaskCard task={tasks[0]} />
      <View style={styles.addTask}>
        <Button BtnText={"Add Task"} onButtonClick={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    padding: 5,
    backgroundColor: "white",
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  tabText: {
    color: "#8A8F9B",
    fontSize: 13,
    fontWeight: "bold",
  },
  activeTab: {
    backgroundColor: "#4577EF",
    borderRadius: 8,
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  addTask: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    left: 20,
    right: 20,
    alignItems: "center",
  },
});
