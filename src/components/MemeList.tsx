"use client";
import { fetchMemes } from "@/lib/fetchMemes";
import { MemeCard } from "./MemeCard";
import { useQuery } from "@tanstack/react-query";
import { MemeType } from "@/lib/types";

const MemeList = () => {
  const page = 10;

  const { data, isLoading, isError, error } = useQuery<MemeType[], Error>({
    queryKey: ["memes", page],
    queryFn: () => fetchMemes(page),
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });

  if (isLoading) {
    return <div>Loading memes...</div>;
  }

  if (isError) {
    return <div>Error fetching memes: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {data?.map((meme) => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
    </div>
  );
};

export default MemeList;
