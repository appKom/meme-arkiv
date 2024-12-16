import emoji from "emoji-dictionary";

export const parseSlackText = (text: string): string => {
  return text.replace(/:([\w+-]+):/g, (match, emojiName) => {
    const emojiChar = emoji.getUnicode(emojiName);
    return emojiChar || match;
  });
};
