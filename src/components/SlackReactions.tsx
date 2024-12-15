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
    <div className="flex min-w-max items-center gap-2 rounded-full border px-3 py-1">
      {url ? (
        <img src={url} className="max-h-6" alt={name} />
      ) : (
        <EmojiComponent name={name} />
      )}
      <div>{count}</div>
    </div>
  );
};
const EmojiComponent = ({ name }: { name: string }) => {
  const emojiChar = emoji.getUnicode(name);
  const className = emojiChar ? "" : "text-sm text-gray-400";

  return <span className={className}>{emojiChar || `:${name}:`}</span>;
};
