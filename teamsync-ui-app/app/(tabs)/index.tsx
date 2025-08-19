import Button from "@/components/Common/Button/Button";
import { router } from "expo-router";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { AuthService } from "../(auth)/auth.service";
export default function HomeScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const data = await AuthService.verifyToken(token);
        if (data.isValid) {
          router.replace("/(workspace)/workspace");
        }
      } catch (err) {
        console.error("Error checking token:", err);
        await AsyncStorage.removeItem("token");
        router.replace("/(auth)/login");
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#006EE9" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Team Sync</Text>
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
    fontWeight: "600",
  },
  buttonGS: {
    position: "absolute",
    width: "100%",
    bottom: 20,
    left: 20,
  },
});
