
import { api } from "./index";

export const authApi = {
  register(data: { username: string; email: string; password: string }) {
    return api.post("/api/auth/register", data);
  },

  login(data: { email: string; password: string }) {
    return api.post("/api/auth/login", data);
  },
};
