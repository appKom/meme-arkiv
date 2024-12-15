import { MemeType } from "../lib/types";
import { formatSlackDate } from "../lib/date";

import Image from "next/image";
import { SlackReaction } from "./SlackReactions";

export const MemeCard = ({ meme }: { meme: MemeType }) => {
  console.log(meme.text);

  return (
    <article className="flex w-full max-w-4xl flex-col items-center gap-4 border rounded-lg border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 px-4 py-3 shadow-lg">
      <div className="flex w-full flex-row justify-between px-2">
        <div className="flex flex-row gap-5">
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
        <p className="text-xl md:text-2xl break-words font-semibold w-full p-2">
          {meme.text}
        </p>
      )}
      {meme.url.endsWith("gif") ? (
        <img
          src={meme.url}
          alt={meme.channelName + " meme"}
          className="max-h-[600px] w-full object-contain"
        />
      ) : meme.type === "image" ? (
        <Image
          src={meme.url}
          alt={meme.channelName + " meme"}
          height={600}
          width={600}
          className="max-h-[600px] w-full object-contain"
        />
      ) : (
        <video
          controls
          className="w-full h-auto"
          preload="metadata"
          style={{ display: "block" }}
        >
          <source src={meme.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

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
    </article>
  );
};
