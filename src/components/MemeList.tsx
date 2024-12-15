"use client";

import { fetchMemes, FetchMemesResponse } from "@/lib/fetchMemes";
import { MemeCard } from "./MemeCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useCallback } from "react";

const MemeList = () => {
  const limit = 10;

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<FetchMemesResponse, Error>({
    initialPageParam: 1,
    queryKey: ["memes"],
    queryFn: ({ pageParam = 1 }) => fetchMemes(pageParam as number, limit),
    getNextPageParam: (lastPage: FetchMemesResponse) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      } else {
        return undefined;
      }
    },
    staleTime: 1000 * 60 * 15,
    retry: 3,
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastMemeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (isLoading) {
    return <div>Loading memes...</div>;
  }

  if (isError) {
    return <div>Error fetching memes: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {data?.pages.map((page, pageIndex) =>
        page.data.map((meme, memeIndex) => {
          if (
            pageIndex === data.pages.length - 1 &&
            memeIndex === page.data.length - 1
          ) {
            return (
              <div
                ref={lastMemeRef}
                key={meme.id}
                className="w-full flex flex-col items-center"
              >
                <MemeCard meme={meme} />
              </div>
            );
          } else {
            return <MemeCard key={meme.id} meme={meme} />;
          }
        })
      )}
      {isFetchingNextPage && <div>Laster mer memes...</div>}
      {!hasNextPage && <div>{`Ingen flere memes å loade :(`}</div>}
    </div>
  );
};

export default MemeList;
