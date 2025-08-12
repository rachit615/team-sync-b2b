import { Text, View } from "react-native";
import { config } from "../configs/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function Notifications() {
  console.log("socket", config().SOCKET_BASE_URL);
  const token = AsyncStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    const socketUrl = config().SOCKET_BASE_URL;
    console.log("socketUrl", socketUrl);
    const socket = io(socketUrl, {
      auth: {
        token,
      },
      transports: ["websocket"],
    });

    // socket.on("notification", (data) => {});

    // return () => {
    //   socket.disconnect();
    // };
  }, [token]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", padding: 20 }}>
        Notifications
      </Text>
    </View>
  );
}
