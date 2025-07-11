import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DateCardProps {
  label: string;
  dateTime: string;
  onPress?: () => void;
}

export default function DateCard({ label, dateTime, onPress }: DateCardProps) {
  return (
    <TouchableOpacity style={styles.dateCard} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name="calendar-outline" size={20} color="white" />
      </View>
      <View style={styles.dateInfo}>
        <Text style={styles.dateLabel}>{label}</Text>
        <Text style={styles.dateText}>{dateTime}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dateCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  iconContainer: {
    backgroundColor: "#4577EF",
    padding: 10,
    borderRadius: 10,
    marginRight: 12,
  },
  dateInfo: {
    flexDirection: "column",
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222",
  },
  dateText: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
});
