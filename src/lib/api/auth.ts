import { publicApi } from "./index";

export const authApi = {
  register(data: { username: string; email: string; password: string; role: string }) {
    return publicApi.post("/auth/register", data);
  },

  login(data: { email: string; password: string; role:string }) {
    return publicApi.post("/auth/login", data);
  },
};
