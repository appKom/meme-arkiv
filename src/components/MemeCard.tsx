import { MemeType } from "../lib/types";
import { formatSlackDate } from "../lib/date";
import { SlackReaction } from "./SlackReactions";

export const MemeCard = ({ meme }: { meme: MemeType }) => {
  return (
    <article className="flex w-full max-w-4xl flex-col items-center gap-4 border-b border-gray-200 bg-white px-4 py-3 shadow-md">
      <div className="flex w-full flex-row justify-between px-2">
        <div className="flex flex-row gap-5">
          <img
            className="h-12 w-12 rounded-lg"
            src={meme.authorImage}
            alt={meme.author}
          />
          <div className="font-medium">
            <div>{meme.author}</div>
            <div className="text-gray-500">{formatSlackDate(meme.date)}</div>
          </div>
        </div>
      </div>
      {meme.type === "image" ? (
        <img
          src={meme.url}
          alt={meme.channelName + "meme"}
          className="max-h-96 w-full object-contain"
        />
      ) : (
        <video
          src={meme.url}
          className="max-h-96 w-full object-contain"
          controls
        />
      )}

      {meme.reactions.length > 0 && (
        <div className="flex w-full flex-grow justify-start gap-2 overflow-hidden p-2">
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
