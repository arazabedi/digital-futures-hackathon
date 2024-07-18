import axios from "axios";
import { CatalogHeaders } from "@/types/types";

export const getUserWeightLog = async () => {
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

export const getCatalogData = async () => {
  try {
    const rawData = await getUserWeightLog();
    const formattedData: CatalogHeaders[] = rawData.map((item: any) => {
      const formattedItem: CatalogHeaders = {
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
