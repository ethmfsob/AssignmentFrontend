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
  const [updateForm, setUpdateForm] = useState({
    _id: null,
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
    // console.log(name, value);

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

  const deleteQuestion = async (_id) => {
    // console.log("delete question working");
    // delete the question
    const res = await axios.delete(`http://localhost:5000/questions/${_id}`);
    console.log(res);
    // update state
    const newQuestions = [...questions].filter((question) => {
      return question._id !== _id;
    });

    // set notes
    setQuestions(newQuestions);
  };

  const handleUpdateFieldChange = (e) => {
    const { value, name } = e.target;
    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (question) => {
    // get the current question values
    // const res =
    // set the update form
    setUpdateForm({
      title: question.title,
      catogery: question.catogery,
      date: question.date,
      _id: question._id,
    });
  };

  const updateQuestion = async (e) => {
    e.preventDefault();
    const { title, catogery, date } = updateForm;
    // Send the update request
    const res = await axios.put(
      `http://localhost:5000/questions/${updateForm._id}`,
      { title, catogery, date }
    );
    // update state
    const newQuestions = [...questions];
    const questionIndex = questions.findIndex((question) => {
      return question._id === updateForm._id;
    });
    newQuestions[questionIndex] = res.data.question;

    setQuestions(newQuestions);

    // clear update form state
    setUpdateForm({
      _id: null,
      title: "",
      catogery: "",
      date: "",
    });
  };
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
                <button onClick={() => deleteQuestion(question._id)}>
                  Delete
                </button>
                <button onClick={() => toggleUpdate(question)}>Update</button>
              </div>
            );
          })}
      </div>

      {/* update question */}
      {updateForm._id && (
        <div>
          <h2>update note</h2>
          <form onSubmit={updateQuestion}>
            <input
              onChange={handleUpdateFieldChange}
              value={updateForm.title}
              name="title"
              placeholder="Title"
            />
            <br />
            <input
              onChange={handleUpdateFieldChange}
              value={updateForm.catogery}
              name="catogery"
              placeholder="Catogery"
            />
            <br />
            <input
              onChange={handleUpdateFieldChange}
              value={updateForm.date}
              name="date"
              placeholder="Date:yyyy-mm-dd"
            />
            <br />
            <button type="submit">Update</button>
          </form>
        </div>
      )}

      {/* add question  */}
      {!updateForm._id && (
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
      )}
    </div>
  );
}

export default App;
