import { http } from "./http";

export const sharePassword = async (data) => {
  return await http.post("/share/store", data);
};

export const sharedPasswordList = async () => {
  return await http.get("/share/getList");
};

export const getSharedPassword = async (id) => {
  return await http.get(`/share/view/${id}`);
};
