export type MemeType = {
  id: string;
  name: number;
  author: string;
  authorImage: string;
  date: string;
  url: string;
  type: "image" | "video";
  reactions: {
    name: string;
    count: number;
    url: string;
  }[];
  channelName: string;
};
