import { RatingData } from "@/lib/types/types";
import Cookies from "js-cookie";
import axios from "axios";

export const addRating = async (data: RatingData) => {
  try {
    const accessToken = Cookies.get("accessToken");
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/rating`,
      {
        modelId: data.modelId,
        userId: data.userId,
        rating: data.rating,
        createdAt: data.createdAt,
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

export const getRatingByModelId = async (modelId: string) => {
  try {
    const accessToken = Cookies.get("accessToken");
    const rating = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/rating/${modelId}`,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    return rating;
  } catch (error: any) {
    throw new Error(error);
  }
};
