import axios from "axios";
import { notifications } from "@mantine/notifications";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message;

    notifications.show({
      title: "err",
      message: message,
      color: "red",
    });

    return Promise.reject(error);
  },
);
