import axios from "axios";
import Cookies from "js-cookie";
import formatDate from "@/utils/formatDate";

export const getUserWeightLog = async () => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/weight-log`,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    const rawData = response.data;
    const formattedData = [
      {
        id: "weight",
        color: "hsl(35, 70%, 50%)",
        data: rawData.map((item: any) => {
          return {
            x: formatDate(item.date),
            y: item.weight,
          };
        }),
      },
    ];
    return formattedData;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logWeight = async (weight: number) => {
  const accessToken = Cookies.get("accessToken");
  let currentDate = new Date();
  console.log(weight);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/weight-log`,
      { logObject: { weight: weight, date: currentDate } },
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
