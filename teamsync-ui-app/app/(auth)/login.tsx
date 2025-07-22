import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthService } from "./auth.service";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please enter email and password");
    }

    try {
      const response = await AuthService.loginUser({ email, password });
      console.log("response", response);
      const { token, user } = response || {};

      await AsyncStorage.setItem("token", token);
      router.push("/(workspace)/workspace");
    } catch (err: any) {
      console.error("Login error:", err?.response?.data || err.message);
      Alert.alert(
        "Login Failed",
        err?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Team Sync</Text>
      <Text style={styles.subtitle}>Management App</Text>

      <Text style={styles.heading}>Login to your account</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="#0057FF" style={styles.icon} />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed"
          size={20}
          color="#0057FF"
          style={styles.icon}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 10 }}>
        <Text style={{ color: "#0057FF", fontSize: 12 }}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primaryBtn} onPress={() => handleLogin()}>
        <Text style={styles.primaryBtnText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>— Or Login with —</Text>

      <View style={styles.socialContainer}>
        <FontAwesome name="google" size={24} color="#DB4437" />
        <FontAwesome name="facebook" size={24} color="#1877F2" />
        <FontAwesome name="twitter" size={24} color="#1DA1F2" />
      </View>

      <Text style={styles.signupText}>
        Don’t have an account?
        <Link href="/(auth)/register" style={{ color: "#0057FF" }}>
          Sign Up
        </Link>
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#0057FF",
    borderRadius: 5,
    padding: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0057FF",
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#aaa",
    alignSelf: "center",
    marginBottom: 20,
  },
  heading: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    marginVertical: 6,
    borderRadius: 8,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, height: 45 },
  primaryBtn: {
    backgroundColor: "#0057FF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  primaryBtnText: { color: "#fff", fontWeight: "bold" },
  orText: { textAlign: "center", marginVertical: 10, color: "#999" },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 50,
    marginTop: 10,
  },
  signupText: {
    textAlign: "center",
    color: "#555",
    marginTop: 20,
    fontSize: 13,
  },
});
