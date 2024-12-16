import { ReactionType } from "@/lib/types";
import EmojiComponent from "./EmojiComponent";

interface Props {
  reaction: ReactionType;
}

export const SlackReaction = ({ reaction }: Props) => {
  return (
    <div className="flex items-center py-2 gap-2 flex-row justify-center rounded-full border border-gray-200 dark:border-gray-800 ">
      {reaction.url ? (
        <img src={reaction.url} className="h-6" alt={reaction.name} />
      ) : (
        <EmojiComponent name={reaction.name} />
      )}
      <div>{reaction.count}</div>
    </div>
  );
};
