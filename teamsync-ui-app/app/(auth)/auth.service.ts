import DataService from "../services";

export const AuthService = {
  registerUser(data: any) {
    return DataService.post("/auth/register", { data });
  },
  loginUser(data: any) {
    return DataService.post("/auth/login", { data });
  },
  logOutUser() {
    return DataService.post("/auth/logout");
  },
};
