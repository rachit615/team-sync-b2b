import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PriorityLabelProps {
  text: string;
  bgColor: string;
  textColor: string;
}

export default function PriorityLabel({
  text,
  bgColor,
  textColor,
}: PriorityLabelProps) {
  return (
    <View style={[styles.labelContainer, { backgroundColor: bgColor }]}>
      <Text style={[styles.labelText, { color: textColor }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
