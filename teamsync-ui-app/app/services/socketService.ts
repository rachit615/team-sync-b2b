import { io, Socket } from "socket.io-client";
import { config } from "../configs/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SOCKET_BASE_URL = config().SOCKET_BASE_URL;

class WSService {
  private socket: Socket | null = null;

  initializeSocket = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      this.socket = io(SOCKET_BASE_URL, {
        transports: ["websocket"],
        auth: { token },
      });
      console.log("initializing socket", this.socket);

      this.socket.on("connect", () => {
        console.log("=== socket connected ===");
      });

      this.socket.on("disconnect", () => {
        console.log("=== socket disconnected ===");
      });

      this.socket.on("error", (error: any) => {
        console.error("Socket error:", error);
      });
    } catch (error) {
      console.error("Error initializing socket:", error);
    }
  };

  emit(event: any, data: any) {
    this.socket?.emit(event, data);
  }

  on(event: any, callback: any) {
    this.socket?.on(event, callback);
  }

  off(event: any, callback: any) {
    this.socket?.off(event, callback);
  }
  removeListener(listnerName: any) {
    this.socket?.removeListener(listnerName);
  }
}

const socketsService = new WSService();
export default socketsService;
