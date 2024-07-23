import axios from "axios";
import { LLMBasicData, CatalogHeaders } from "@/lib/types/types";
import Cookies from "js-cookie";

export const getAllLlmData = async () => {
  try {
    // const accessToken = Cookies.get("accessToken");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/llm-models`
      // {
      // 	headers: {
      // 		"x-access-token": accessToken,
      // 	},
      // }
    );
    const rawData = response.data;
    return rawData;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getLlmById = async (id: string) => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/llm-models/${id}`,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    const rawData = response.data;
    return rawData;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCatalogData = async () => {
  try {
    const rawData = await getAllLlmData();
    const formattedData: CatalogHeaders[] = rawData.map((item: any) => {
      const formattedItem: CatalogHeaders = {
        _id: item._id,
        llm: item.name,
        organization: item.organization,
        description: item.description,
        modality: item.modality,
      };
      return formattedItem;
    });
    return formattedData;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteLLM = async (id: string) => {
  try {
    const accessToken = Cookies.get("accessToken");
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/llm-models/${id}`, {
      headers: {
        "x-access-token": accessToken,
      },
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addLLMBasic = async (data: LLMBasicData) => {
  try {
    const accessToken = Cookies.get("accessToken");
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/llm-models`,
      {
        name: data.name,
        organization: data.organization,
        description: data.description,
        modality: data.modality,
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
}
