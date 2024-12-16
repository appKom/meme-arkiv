"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMeme, FetchMemeResponse } from "@/lib/fetchMemes";
import { MemeType, CommentType } from "@/lib/types";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { MemeCard } from "@/components/MemeCard";
import HeaderText from "@/components/HeaderText";
import MemeCardSkeleton from "@/components/MemeCardSkeleton";

const LIMIT = 10;

const MemePage = () => {
  const params = useParams();
  const { id } = params;

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<FetchMemeResponse, Error>({
    initialPageParam: 1,
    queryKey: ["meme", id],
    queryFn: ({ pageParam = 1 }) =>
      fetchMeme(id as string, pageParam as number, LIMIT),
    getNextPageParam: (lastPage: FetchMemeResponse) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      } else {
        return undefined;
      }
    },
    staleTime: 1000 * 60 * 15,
    retry: 3,
  });

  const meme: MemeType | undefined = data?.pages[0]?.data.meme;

  const comments: CommentType[] = data
    ? data.pages.flatMap((page) => page.data.comments)
    : [];

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main className="mt-24 min-h-screen px-5 flex flex-col items-center gap-4">
      {isLoading || !meme ? (
        Array.from({ length: 1 }, (_, index) => (
          <div key={index} className="w-full flex flex-col items-center">
            <MemeCardSkeleton />
          </div>
        ))
      ) : (
        <MemeCard key={meme.id} meme={meme} redirect={false} />
      )}

      <div className="">
        {comments && comments.length > 0 && <HeaderText title="Kommentarer" />}

        {comments.map((comment) => (
          <MemeCard key={comment.commentId} meme={comment} redirect={false} />
        ))}

        <div ref={loadMoreRef} />
      </div>
    </main>
  );
};

export default MemePage;
