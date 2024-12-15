import emoji from "emoji-dictionary";

export const SlackReaction = ({
  url,
  count,
  name,
}: {
  url: string;
  count: number;
  name: string;
}) => {
  return (
    <div className="flex items-center py-2 gap-2 flex-row justify-center rounded-full border border-gray-200 dark:border-gray-800 ">
      {url ? (
        <img src={url} className="h-6" alt={name} />
      ) : (
        <EmojiComponent name={name} />
      )}
      <div>{count}</div>
    </div>
  );
};
const EmojiComponent = ({ name }: { name: string }) => {
  const emojiChar = emoji.getUnicode(name);
  const className = emojiChar ? "" : "text-sm text-gray-400 dark:text-gray-500";

  return <span className={className}>{emojiChar || `:${name}:`}</span>;
};
