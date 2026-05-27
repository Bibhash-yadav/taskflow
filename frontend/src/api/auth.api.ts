import API from "./axios";

export const registerUser = async (
  userData: {
    name: string;
    email: string;
    password: string;
  }
) => {
  const response = await API.post(
    "/auth/register",
    userData
  );

  return response.data;
};

export const loginUser = async (
  userData: {
    email: string;
    password: string;
  }
) => {
  const response = await API.post(
    "/auth/login",
    userData
  );

  return response.data;
};