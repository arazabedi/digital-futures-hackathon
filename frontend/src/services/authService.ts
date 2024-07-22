import axios from "axios";
import Cookies from "js-cookie";
import { registrationDetails } from "@/types/types";

export const register = async (userData: registrationDetails) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      userData
    );
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    { username, password }
  );
  if (response.status === 200) {
    Cookies.set("accessToken", response.data.accessToken, {
      expires: 1,
    });
    return response.data;
  } else {
    throw new Error("Login failed");
  }
};

export const logout = async () => {
  try {
    // const response = await axios.post(
    //   `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    //   {},
    //   {
    //     headers: {
    //       "x-access-token": accessToken,
    //     },
    //   }
    // );
    Cookies.remove("accessToken");
  } catch (error) {
    throw new Error("Logout failed");
  }
};
