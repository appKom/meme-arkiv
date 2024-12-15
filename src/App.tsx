import { useQuery } from "@tanstack/react-query";
import { MemeType } from "./lib/types";
import { fetchMemes } from "./lib/fetchMemes";
import HeaderText from "./components/HeaderText";
import { MemeCard } from "./components/MemeCard";
import { memes } from "./lib/mockData";

const App = () => {
  // const amount = 10;

  // const { data, isLoading, isError, error } = useQuery<MemeType[], Error>({
  //   queryKey: ["memes", amount],
  //   queryFn: () => fetchMemes(amount),
  //   staleTime: 1000 * 60 * 5,
  //   retry: 3,
  // });

  // if (isLoading) {
  //   return <div>Loading memes...</div>;
  // }

  // if (isError) {
  //   return <div>Error fetching memes: {error.message}</div>;
  // }

  return (
    <main className="mt-24 min-h-screen px-5">
      <HeaderText title="Meme arkiv" />

      <div className="flex flex-col items-center gap-4">
        {memes?.map((meme) => <MemeCard key={meme.id} meme={meme} />)}
      </div>
    </main>
  );
};

export default App;
