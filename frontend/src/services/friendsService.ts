import axios from "axios";
import { type Option } from "@/components/Autocomplete";
import Cookies from "js-cookie";
import formatDate from "@/utils/formatDate";
import { CloudRain } from "lucide-react";

export const searchUsers = async (params: Option | undefined) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/?params=${params}`
    );
    let searchArray: any[] = [];
    response.data.forEach((obj: any) => {
      searchArray.push({ value: obj.username, label: obj.username });
    });
    return searchArray;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserDetails = async (params: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/?params=${params}`
    );
    return response.data[0];
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllUsernames = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/all`
    );
    let searchArray: any = [];
    response.data.forEach((obj: any) => {
      searchArray.push({ value: obj.username, label: obj.username });
    });
    return searchArray;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllUsernamesInArray = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/all`
    );
    const arr: string[] = [];
    response.data.forEach((obj: any) => {
      arr.push(obj.username);
    });
    return arr;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const sendFriendRequest = async (friendId: string) => {
  const accessToken = Cookies.get("accessToken");
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/friends/requests/send`,
      { request_id: friendId },
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const isRequested = async (friendId: string) => {
  const accessToken = Cookies.get("accessToken");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/friends/requests/sent`,
      {
        headers: {
          "X-Access-Token": accessToken,
        },
      }
    );
    if (response.data.includes(friendId)) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getReceivedRequests = async () => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken) {
    throw new Error("No access token found");
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/friends/requests/received`,
      {
        headers: {
          "X-Access-Token": accessToken,
        },
      }
    );

    const idArray = response.data;
    const usernameArray: string[] = await Promise.all(
      idArray.map(async (id: string) => {
        const userDetails = await getUserDetails(id);
        return userDetails.username;
      })
    );

    return usernameArray;
  } catch (error: any) {
    console.error("Error fetching received requests:", error);
    throw new Error(error.message || "An error occurred");
  }
};

export const getSentRequests = async () => {
  const accessToken = Cookies.get("accessToken");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/friends/requests/sent`,
      {
        headers: {
          "X-Access-Token": accessToken,
        },
      }
    );
    const idArray = response.data;

    const usernameArray = await Promise.all(
      idArray.map(async (id: string) => {
        const userDetails = await getUserDetails(id);
        return userDetails.username;
      })
    );

    return usernameArray;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllFriendsWeightLogs = async () => {
  const accessToken = Cookies.get("accessToken");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/friends/weight-logs`,
      {
        headers: {
          "X-Access-Token": accessToken,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getFormattedUserWeightLog = async (
  allFriendWeightLogs: any,
  username: string
) => {
  try {
    const index = allFriendWeightLogs.findIndex(
      (item: any) => item.friend_username == username
    );
    const rawData = allFriendWeightLogs[index];
    const weightLog = rawData.weight_log;
    // console.log(weightLog);
    const formattedData = [
      {
        id: "weight",
        color: "hsl(35, 70%, 50%)",
        data: weightLog.map((item: any) => {
          return {
            x: formatDate(item.date),
            y: item.weight,
          };
        }),
      },
    ];
    return formattedData;
  } catch (error: any) {}
};

export const acceptRequest = async (username: string) => {
  const accessToken = Cookies.get("accessToken");

  let requestId = "";

  try {
    const userDetails = await getUserDetails(username);
    requestId = userDetails._id;
  } catch (error: any) {
    throw new Error(error);
  }

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/friends/requests/accept`,
      {
        request_id: requestId,
      },
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
  } catch (error: any) {
    throw new Error(error);
  }
};
