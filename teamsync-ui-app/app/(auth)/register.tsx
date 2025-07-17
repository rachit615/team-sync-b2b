import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthService } from "./auth.service";

export default function RegisterScreen() {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    if (
      !userFormData.username ||
      !userFormData.email ||
      !userFormData.password ||
      !userFormData.confirmPassword
    ) {
      Alert.alert("Please fill in all the fields");
      return;
    }
    if (userFormData.password !== userFormData.confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    console.log("first");

    try {
      const res = await AuthService.registerUser({
        name: userFormData.username,
        email: userFormData.email,
        password: userFormData.password,
      });
      console.log("Registration successful", res);
      // Navigate to login or home
    } catch (error: any) {
      console.error("Registration failed", error);
      Alert.alert(
        "Registration failed",
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  const handleOnChangeText = (key: string, value: string) => {
    setUserFormData({ ...userFormData, [key]: value });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.title}>Team Sync</Text>
          <Text style={styles.subtitle}>Management App</Text>

          <Text style={styles.heading}>Create your account</Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="person"
              size={20}
              color="#0057FF"
              style={styles.icon}
            />
            <TextInput
              placeholder="Username"
              style={styles.input}
              value={userFormData.username}
              onChangeText={(value) => handleOnChangeText("username", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail"
              size={20}
              color="#0057FF"
              style={styles.icon}
            />
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              style={styles.input}
              value={userFormData.email}
              onChangeText={(value) => handleOnChangeText("email", value)}
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
              value={userFormData.password}
              onChangeText={(value) => handleOnChangeText("password", value)}
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
              placeholder="Confirm Password"
              secureTextEntry
              style={styles.input}
              value={userFormData.confirmPassword}
              onChangeText={(value) =>
                handleOnChangeText("confirmPassword", value)
              }
            />
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={handleRegister}>
            <Text style={styles.primaryBtnText}>Register</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>— Or Register with —</Text>

          <View style={styles.socialContainer}>
            <FontAwesome name="google" size={24} color="#DB4437" />
            <FontAwesome name="facebook" size={24} color="#1877F2" />
            <FontAwesome name="twitter" size={24} color="#1DA1F2" />
          </View>
        </View>
      </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
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
});
