import "./App.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const TodoItemInputField = (props) => {
  const [input, setInput] = useState("");
  console.log(input);

  //버튼 눌렸을 때 onSubmit callback 콜 해주기
  const onSubmit = (newtodoitem) => {
    props.onSubmit(input);
    setInput("");
  };

  return (
    <div>
      <TextField
        id="todo-item-input"
        label="Todo Item"
        variant="outlined"
        //유저가 입력한 값 업데이트 시키기
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />

      <Button variant="outlined" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

//등록된 Todo 아이템 보여줄 TodoItemList 리엑트 콤포넌트 만들기
const TodoItemList = (props) => {
  //새로운 투두아이템들 보여줘야함. props 통해 받아와야해서 todolist 형태도 받아온다
  const todoList = props.todoItemList.map((todoItem, index) => {
    return <li key={index}>{todoItem.todoItemContent}</li>;
  });

  return (
    <div>
      <ul>{todoList}</ul>
    </div>
  );
};

function App() {
  const [todoItemList, setTodoItemList] = useState([]);

  return (
    <div className="App">
      <TodoItemInputField onSubmit={() => {}} />
      <TodoItemList todoItemList={[]} />
      <TodoItemList todoItemList={todoItemList} />
    </div>
  );
}

export default App;
