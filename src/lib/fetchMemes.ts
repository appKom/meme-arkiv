import { MemeType } from "./types";

export const fetchMemes = async (page: number): Promise<MemeType[]> => {
  const apiUrl = `/api/memes?page=${page}`;

  const response = await fetch(apiUrl, {
    headers: {
      "x-api-key": "",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch memes");
  }

  return response.json();
};
