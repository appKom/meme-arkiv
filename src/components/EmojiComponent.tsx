import emoji from "emoji-dictionary";
import { customEmojis } from "@/lib/emoji";

const EmojiComponent = ({ name }: { name: string }) => {
  const parts = name.split(":").filter(Boolean);

  const emojiChars = parts
    .map((part) => {
      const baseEmoji = emoji.getUnicode(part);
      if (baseEmoji) return baseEmoji;

      if (customEmojis[part]) {
        return customEmojis[part];
      }

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

export default EmojiComponent;
