import { Main } from "./Main";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Chat = () => {
  return (
    <div className="flex h-full p-3 flex-col">
      <Header />

      <Main />

      <Footer />
    </div>
  );
};
