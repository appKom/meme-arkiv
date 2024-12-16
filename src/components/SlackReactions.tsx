import { ReactionType } from "@/lib/types";
import emoji from "emoji-dictionary";

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
const EmojiComponent = ({ name }: { name: string }) => {
  const parts = name.split(":").filter(Boolean);

  const emojiChars = parts
    .map((part) => {
      const baseEmoji = emoji.getUnicode(part);
      if (baseEmoji) return baseEmoji;

      const skinToneMatch = part.match(/skin-tone-(\d+)/);
      if (skinToneMatch) {
        const tone = skinToneMatch[1];
        const skinTones: { [key: string]: string } = {
          "1": "\uD83C\uDFFB",
          "2": "\uD83C\uDFFC",
          "3": "\uD83C\uDFFD",
          "4": "\uD83C\uDFFE",
          "5": "\uD83C\uDFFF",
        };
        return skinTones[tone] || "";
      }

      return `:${part}:`;
    })
    .join("");

  const className = emojiChars
    ? ""
    : "text-sm text-gray-400 dark:text-gray-500";

  return <span className={className}>{emojiChars || `:${name}:`}</span>;
};
