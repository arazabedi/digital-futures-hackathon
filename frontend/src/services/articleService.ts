import axios from "axios";
import Cookies from "js-cookie";
import { NewsArticle, NewsHeaders } from "@/lib/types/types";

export const getAllNews = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news`);
    const rawData = response.data;
    return rawData;
  } catch (error: any) {
    throw new Error(error.message || 'Error fetching news');
  }
};

export const getNewsById = async (id: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`);
    const rawData = response.data;
    return rawData;
  } catch (error: any) {
    throw new Error(error.message || 'Error fetching news by ID');
  }
};

export const getRelatedNewsByModelName = async (name: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news/related/${name}`);
    const rawData = response.data;
    return rawData;
  } catch (error: any) {
    throw new Error(error.message || 'Error fetching related news');
  }
};

export const addNews = async (newsArticle: NewsArticle) => {
  try {
    const accessToken = Cookies.get("accessToken");
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/news`,
      newsArticle,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
  } catch (error: any) {
    throw new Error(error.message || 'Error adding news');
  }
};

export const updateNewsById = async (id: string, newsArticle: NewsArticle) => {
  try {
    const accessToken = Cookies.get("accessToken");
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/news/${id}`,
      newsArticle,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
  } catch (error: any) {
    throw new Error(error.message || 'Error updating news');
  }
};

export const deleteNewsById = async (id: string) => {
  try {
    const accessToken = Cookies.get("accessToken");
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`, {
      headers: {
        "x-access-token": accessToken,
      },
    });
  } catch (error: any) {
    throw new Error(error.message || 'Error deleting news');
  }
};
