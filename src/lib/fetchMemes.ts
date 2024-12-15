import { MemeType } from "./types";

export interface FetchMemesResponse {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
  data: MemeType[];
}

export const fetchMemes = async (
  page: number,
  limit: number = 10
): Promise<FetchMemesResponse> => {
  const apiUrl = `/api/memes?page=${page}&limit=${limit}`;

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const response = await fetch(apiUrl, {
    headers: {
      "x-api-key": apiKey || "",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch memes");
  }

  return response.json();
};
