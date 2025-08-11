import { Server as HttpServer } from "http";
import { Server as IOServer, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { config } from "../config/app.config";

let io: IOServer | null = null;

export const initSocket = (server: HttpServer) => {
  io = new IOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket: Socket, next: any) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        return next(new Error("Authentication error: token missing"));
      }
      const decoded = jwt.verify(token, config.JWT_SECRET) as any;
      // attach user info to socket
      (socket as any).user = decoded;
      return next();
    } catch (err) {
      return next(new Error("Authentication error: invalid token"));
    }
  });

  io.on("connection", (socket: Socket) => {
    const user = (socket as any).user;
    if (user && user.id) {
      // join a room named by user id for targeted emits
      socket.join(user.id);
    }

    socket.on("disconnect", () => {
      // any cleanup if required
    });
  });

  return io;
};

export const getIO = () => {
  if (!io)
    throw new Error(
      "Socket.io not initialized. Call initSocket(server) first."
    );
  return io;
};
