import { RatingData } from "@/lib/types/types";
import Cookies from "js-cookie";
import axios from "axios";

export const addRating = async (data: RatingData) => {
	try {
		const accessToken = Cookies.get("accessToken");
		await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/llm-models`,
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
}
