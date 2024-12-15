import { useState } from "react";

import { Badge } from "./Badge";
import { MemeType } from "../lib/types";
import { formatSlackDate } from "../lib/date";
import { SlackReaction } from "./SlackReactions";

export const MemeCard = ({ meme }: { meme: MemeType }) => {
  return (
    <div className="flex w-full max-w-4xl items-center gap-4 border-b border-gray-200 px-4 py-3">
      <img
        className="h-12 w-12 rounded-lg"
        src={meme.authorImage}
        alt={meme.author}
      />
      <div className="font-medium dark:text-white">
        <div>{meme.author}</div>
        <div className="text-gray-500 dark:text-gray-400">
          {formatSlackDate(meme.date)}
        </div>
      </div>
      <Badge
        text={"#" + meme.channelName}
        color="blue"
        className="absolute right-3 top-3"
      />

      {meme.reactions.length > 0 && (
        <div className="flex w-full flex-grow justify-start gap-2 overflow-hidden p-2">
          {meme.reactions.map((reaction, index) => (
            <SlackReaction
              key={index}
              url={reaction.url}
              count={reaction.count}
              name={reaction.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};
