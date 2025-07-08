import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
  onButtonClick: () => void;
  BtnText: string;
  style?: ViewStyle;
}

export default function Button({ onButtonClick, BtnText, style }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onButtonClick}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{BtnText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4577EF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
