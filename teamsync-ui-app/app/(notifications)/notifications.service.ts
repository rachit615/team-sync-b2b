import DataService from "../services";

export const NotificationService = {
  registerUser(data: any) {
    return DataService.post("/auth/register", { data });
  },
  loginUser(data: any) {
    return DataService.post("/auth/login", { data });
  },
  logOutUser() {
    return DataService.post("/auth/logout");
  },
  verifyToken(token: string | null) {
    return DataService.post("/auth/validate-token", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
};
