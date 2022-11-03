import { getEasyQuestions } from "./api/question";
import { useQuery } from "react-query";
import "./App.css";

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
      <header>Frivolous Hunter</header>
      <div>Questions</div>
    </>
  );
}

export default App;
