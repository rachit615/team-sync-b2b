import Button from "@/components/Common/Button/Button";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Team Sync </Text>
      <Button
        BtnText={"Get Started"}
        onButtonClick={() => {
          router.push("/(auth)/login");
        }}
        style={styles.buttonGS}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 30,
    marginTop: 20,
    color: "#006EE9",
    fontWeight: 600,
  },
  buttonGS: {
    position: "absolute",
    width: "100%",
    bottom: 20,
    left: 20,
  },
});
