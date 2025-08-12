import Constants from "expo-constants";

export const config = () => {
  let API_SERVER_URL = "http://localhost:8000/api";
  let SOCKET_BASE_URL = "http://localhost:8000/";
  if (process.env.APP_ENV === "production") {
    API_SERVER_URL = "http://localhost:8000/api";
  } else if (process.env.APP_ENV === "development") {
    API_SERVER_URL = "http://localhost:8000/api";
  } else if (process.env.APP_ENV === "staging") {
    API_SERVER_URL = "http://localhost:8000/api";
  } else {
    // For mobile device for temporary use added for testing
    const debuggerHost = Constants?.expoConfig?.hostUri?.split(":")[0];
    API_SERVER_URL = `http://${debuggerHost}:8000/api`;
    SOCKET_BASE_URL = `http://${debuggerHost}:8000`;
  }
  return {
    API_SERVER_URL,
    SOCKET_BASE_URL,
  };
};
