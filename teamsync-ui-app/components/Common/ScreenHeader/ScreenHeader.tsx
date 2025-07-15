import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ScreenHeader({
  headerTitle = "",
  leftIcon = "",
  rightIcon = "",
  leftIconPress,
  rightIconPress,
  headerStyle,
}: any) {
  return (
    <View style={[styles.header, headerStyle]}>
      <TouchableOpacity onPress={leftIconPress} style={[styles.headerIcon]}>
        <Ionicons name={leftIcon} size={24} color="#292A2D" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{headerTitle}</Text>
      <TouchableOpacity style={styles.headerIcon} onPress={rightIconPress}>
        <Ionicons name={rightIcon} size={24} color="#292A2D" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#292A2D",
  },
  headerIcon: {
    padding: 5,
  },
});
