import { formatSlackDate } from "@/lib/date";
import { MemeType, CommentType, isMemeType } from "@/lib/types";
import { SlackReaction } from "./SlackReactions";
import Image from "next/image";
import Link from "next/link";
import { useFormattedSlackText } from "@/lib/text";
import ReactMarkdown from "react-markdown";
import MarkdownComponents from "@/components/Markdown";

interface Props {
  meme: MemeType | CommentType;
  redirect?: boolean;
}

export const MemeCard = ({ meme, redirect = true }: Props) => {
  const formatedSlackText = useFormattedSlackText(meme.text || "");

  const videoElement = (
    <video
      controls
      className="w-full h-auto"
      preload="metadata"
      style={{ display: "block" }}
    >
      <source src={meme.url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );

  const content = (
    <>
      <div className="flex w-full flex-row justify-between px-2 mb-4">
        <div className="flex flex-row w-full gap-5">
          <Image
            className="h-12 w-12 rounded-lg"
            height={50}
            width={50}
            src={meme.authorImage}
            alt={meme.author}
          />
          <div className="font-medium">
            <div>{meme.author}</div>
            <div className="text-gray-500">{formatSlackDate(meme.date)}</div>
          </div>
        </div>
      </div>
      {meme.text && (
        <article className="flex flex-col">
          <ReactMarkdown
            components={MarkdownComponents}
            className="w-full font-bold break-words"
          >
            {formatedSlackText.headerLine}
          </ReactMarkdown>
          <ReactMarkdown
            components={MarkdownComponents}
            className="w-full break-words"
          >
            {formatedSlackText.formattedText}
          </ReactMarkdown>
        </article>
      )}
      {meme.url && (
        <>
          {meme.url.endsWith("gif") ? (
            <img
              src={meme.url}
              alt={`${meme.channelName} meme`}
              className="max-h-[600px] w-full object-contain"
            />
          ) : meme.type === "image" ? (
            <Image
              src={meme.url}
              alt={`${meme.channelName} meme`}
              height={600}
              width={600}
              className="max-h-[600px] w-full object-contain"
            />
          ) : null}

          {meme.type !== "video" && meme.reactions.length > 0 && (
            <div className="grid w-full grid-cols-2 gap-2 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {meme.reactions.map(
                (reaction, index) =>
                  reaction.url && (
                    <SlackReaction
                      key={index}
                      url={reaction.url}
                      count={reaction.count}
                      name={reaction.name}
                    />
                  )
              )}
            </div>
          )}

          {meme.amtComments > 0 && meme.type !== "video" && (
            <div className="flex w-full justify-center items-center p-2">
              <span className="flex flex-row gap-1 text-xl items-center">
                <p className="text-lg font-semibold">{meme.amtComments}</p>
                <p className="text-gray-600 dark:text-gray-200">
                  {meme.amtComments === 1 ? "kommentar" : "kommentarer"}
                </p>
              </span>
            </div>
          )}
        </>
      )}
    </>
  );

  return (
    <article className="flex w-full max-w-4xl flex-col items-center gap-4 border rounded-lg border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 px-4 py-3 shadow-lg">
      {isMemeType(meme) && redirect && meme.type !== "video" ? (
        <Link className="w-full" href={`/meme/${meme.id}`}>
          <div>{content}</div>
        </Link>
      ) : redirect && isMemeType(meme) ? (
        <div className="w-full">
          <Link href={`/meme/${meme.id}`}>{content}</Link>
          {meme.type === "video" && videoElement}
          <Link href={`/meme/${meme.id}`}>
            {meme.reactions.length > 0 && (
              <div className="grid w-full grid-cols-2 gap-2 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {meme.reactions.map(
                  (reaction, index) =>
                    reaction.url && (
                      <SlackReaction
                        key={index}
                        url={reaction.url}
                        count={reaction.count}
                        name={reaction.name}
                      />
                    )
                )}
              </div>
            )}
            {meme.amtComments > 0 && (
              <div className="flex w-full justify-center items-center p-2">
                <span className="flex flex-row gap-1 text-xl items-center">
                  <p className="text-lg font-semibold">{meme.amtComments}</p>
                  <p className="text-gray-600 dark:text-gray-200">
                    {meme.amtComments === 1 ? "kommentar" : "kommentarer"}
                  </p>
                </span>
              </div>
            )}
          </Link>
        </div>
      ) : (
        <div className="w-full">
          {content}
          {meme.type === "video" && videoElement}
        </div>
      )}
    </article>
  );
};
