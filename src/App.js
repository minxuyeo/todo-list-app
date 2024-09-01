import "./App.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const TodoItemInputField = (props) => {
  const [input, setInput] = useState("");
  console.log(input);

  //버튼 눌렸을 때 onSubmit callback 콜 해주기
  const onSubmit = () => {
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

      <Button variant="outlined" onClick={onsubmit}>
        Submit
      </Button>
    </div>
  );
};
function App() {
  return (
    <div className="App">
      <TodoItemInputField
        onsubmit={(input) => {
          console.log(input);
        }}
      />
    </div>
  );
}

export default App;
