import joypixels from "emoji-toolkit";
import DOMPurify from "dompurify";

export const useFormattedSlackText = (text: string) => {
  // Sanitize the text to prevent XSS attacks

  const mentionRegex = /<@U[A-Z0-9]+>/g;
  const textWithUsernames = text.replace(mentionRegex, () => {
    return '<span style="color: purple;">@Someone</span>';
  });

  const sanitizedText = DOMPurify.sanitize(textWithUsernames);

  // Convert shortnames to Unicode emojis
  const unicodeText = joypixels.shortnameToUnicode(sanitizedText);

  // Remove unsupported emojis
  const cleanText = removeUnsupportedEmojis(unicodeText);

  // Convert *text* to bold and _text_ to italic using regex
  const formattedTextWithStyles = cleanText
    .replace(/\*(.*?)\*/g, "<strong>$1</strong>") // Bold for *text*
    .replace(/_(.*?)_/g, "<em>$1</em>"); // Italic for _text_

  // Remove leading and trailing spaces and line breaks
  const trimmedText = formattedTextWithStyles.trim();

  // Split text into lines
  const lines = trimmedText.split("\n").map((line) => line.trim());

  // Extract header line and the remaining lines
  const headerLine = lines[0];
  const restLines = lines.slice(1);

  // Filter out leading empty lines, keep only from the first non-empty line onward
  const filteredLines = restLines.filter(
    (line: string, index: number) =>
      line !== "" || restLines.slice(0, index).some((l: string) => l !== "")
  );

  const formattedText = filteredLines
    .map((line: string, index: number) => {
      // Handle blockquote lines starting with ">"
      if (line.startsWith(">")) {
        const cleanLine = line.substring(1); // Remove the ">" prefix
        return `<blockquote class="px-2 border-s-4 border-gray-300 dark:border-gray-500">${cleanLine}</blockquote>`;
      }

      // Ensure line breaks are preserved
      return line === ""
        ? "\n"
        : line + (index < filteredLines.length - 1 ? "\n" : "");
    })
    .join("")
    .replace(/\n/g, "<br />");

  return { headerLine, formattedText };
};

export const removeUnsupportedEmojis = (input: string): string => {
  // Regular expression to find text-based emoji like :man-surfing:
  const emojiRegex = /:[a-zA-Z0-9_\-+]+:/g;

  return input.replace(emojiRegex, "");
};
