import { FC } from "react";
import Header from "./views/Header/Header";
import Game from "./views/Game/Game";

const App: FC = () => {
  return (
    <>
      <Header />
      <Game />
    </>
  );
};

export default App;
