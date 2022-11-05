import { getEasyQuestions } from "./api/question";
import { useQuery } from "react-query";
import "./App.css";
import Header from "./components/Header/Header";

function App() {
  const { data: easyQuestions } = useQuery(
    ["easy-question"],
    getEasyQuestions,
    {
      select: (question) => ({ data: question.results }),
    }
  );

  console.log(easyQuestions?.data);

  return (
    <>
      <Header />
    </>
  );
}

export default App;
