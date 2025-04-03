import { http } from "./http";

export const getAllPassword = async () => {
  return await http.get("/password/list");
};

export const savePassword = async (data) => {
  return await http.post("/password/save", data);
};

export const viewPassword = async (id) => {
  return await http.get(`/password/view/${id}`);
};

export const updatePassword = async (id, data) => {
  return await http.put(`/password/update/${id}`, data);
};

export const deletePassword = async (id) => {
  return await http.delete(`/password/delete/${id}`);
};
