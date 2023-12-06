import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  //state
  const [questions, setQuestions] = useState();
  const [createForm, setCreateForm] = useState({
    title: "",
    catogery: "",
    date: "",
  });

  // use effects
  // run fetchQuestions funciton
  useEffect(() => {
    fetchQuestios();
  }, []);

  // functions
  const fetchQuestios = async () => {
    // fetch the questions
    const res = await axios.get("http://localhost:5000/questions");
    // set to state
    setQuestions(res.data.questions);
    console.log(res);
  };

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;

    setCreateForm({
      ...createForm,
      [name]: value,
    });
    // console.log({ name, value });
  };

  const createQuestion = async (e) => {
    e.preventDefault();
    // create a question
    const res = await axios.post("http://localhost:5000/questions", createForm);
    // update state
    setQuestions([...questions, res.data.question]);
    // clear form state
    setCreateForm({ title: "", catogery: "", date: "" });
  };

  const deleteQuestion = () => {
    // delete the question
    
    // update state
  }

  return (
    <div className="App">
      {/* questions */}
      <div>
        <h2>Questions: </h2>
        {questions &&
          questions.map((question) => {
            return (
              <div key={question._id}>
                <h3>{question.title}</h3>
                <button>Delete</button>
              </div>
            );
          })}
      </div>

      {/* add question  */}
      <div>
        <h2>Add a Question</h2>
        <form onSubmit={createQuestion}>
          <input
            onChange={updateCreateFormField}
            value={createForm.title}
            type="text"
            name="title"
            placeholder="Title"
          />
          <br />
          <input
            onChange={updateCreateFormField}
            value={createForm.catogery}
            type="text"
            name="catogery"
            placeholder="Catogery"
          />
          <br />
          <input
            onChange={updateCreateFormField}
            value={createForm.date}
            type="text"
            name="date"
            placeholder="Date:yyyy-mm-dd"
          />
          <br />
          <button type="submit">Create question</button>
        </form>
      </div>
    </div>
  );
}

export default App;
