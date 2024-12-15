import HeaderText from "@/components/HeaderText";
import MemeList from "@/components/MemeList";

const App = () => {
  return (
    <main className="mt-24 min-h-screen px-5">
      <HeaderText title="Meme arkiv" />
      <MemeList />
    </main>
  );
};

export default App;
