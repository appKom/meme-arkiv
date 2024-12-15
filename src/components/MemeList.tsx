"use client";

import { fetchMemes, FetchMemesResponse } from "@/lib/fetchMemes";
import { MemeCard } from "./MemeCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useCallback } from "react";
import { MemeType } from "@/lib/types";
import MemeCardSkeleton from "./MemeCardSkeleton";

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

  if (isError) {
    return <div>Ops det skjedde en feil: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {isLoading
        ? Array.from({ length: limit }, (_, index) => (
            <div key={index} className="w-full flex flex-col items-center">
              <MemeCardSkeleton />
            </div>
          ))
        : data?.pages.map((page: FetchMemesResponse, pageIndex: number) =>
            page.data.map((meme: MemeType, memeIndex: number) => {
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
      {isFetchingNextPage &&
        Array.from({ length: 2 }, (_, index) => (
          <div key={index} className="w-full flex flex-col items-center">
            <MemeCardSkeleton />
          </div>
        ))}
      {!hasNextPage && <div>{`Ingen flere memes å loade :(`}</div>}
    </div>
  );
};

export default MemeList;
