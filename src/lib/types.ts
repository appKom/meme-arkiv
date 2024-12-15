export type MemeType = {
  id: string;
  name: string;
  author: string;
  authorImage: string;
  date: string;
  url: string;
  text?: string;
  type: "image" | "video";
  reactions: {
    name: string;
    count: number;
    url: string | null;
  }[];
  channelName: string;
};
