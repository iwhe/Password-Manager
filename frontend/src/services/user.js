import { http } from "./http";

export const registerUser = async (data) => {
  return await http.post(`/user/register`, data);
};

export const loginUser = async (data) => {
  return http.post(`/user/login`, data);
};

export const getCurrentUser = async () => {
  return http.get(`/user/me`);
};
export const signOutUser = async () => {
  return http.post(`/user/logout`);
};

export const searchUser = async (email) => {
  // console.log("EMialll", email);
  return await http.post(`/user/search`, email);
};

export const getTOTPSecret = async (userId) => {
  console.log("calling totp api:", userId);
  return await http.post(`/user/totp-secret`, { userId });
};

export const verifyTOTPSecret = async (secret) => {
  console.log(secret);

  return await http.post(`/user/verify-secret`, { secret });
};

export const check2FaVerification = async () => {
  return await http.get("/user/check-2fa-verification");
};
