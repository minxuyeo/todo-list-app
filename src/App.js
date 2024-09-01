import "./App.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

//Todo 아이템 버튼 눌릴때 스태이트에 추가하는 callback function 만들어서 props 로 패스하기
let todoItemId = 0;

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

      <Button variant="outlined" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

// 등록된 todo 아이템을 위한 todoitem 리엑트 컴포넌트 만들기
const TodoItem = (props) => {
  const style = props.todoItem.isFinished
    ? { textDecoration: "line-through" }
    : {};
  return (
    <li>
      <span style={style} onClick={() => props.onTodoItemClick(props.todoItem)}>
        {props.todoItem.todoItemContent}
      </span>
    </li>
  );
};

//등록된 Todo 아이템 보여줄 TodoItemList 리엑트 콤포넌트 만들기
const TodoItemList = (props) => {
  //새로운 투두아이템들 보여줘야함. props 통해 받아와야해서 todolist 형태도 받아온다
  const todoList = props.todoItemList.map((todoItem, index) => {
    return (
      <TodoItem
        key={index}
        todoItem={todoItem}
        onTodoItemClick={props.onTodoItemClick}
      />
    );
  });

  return (
    <div>
      <ul>{todoList}</ul>
    </div>
  );
};

function App() {
  const [todoItemList, setTodoItemList] = useState([]);

  const onSubmit = (newTodoItem) => {
    setTodoItemList([
      ...todoItemList,
      {
        id: todoItemId++,
        todoItemContent: newTodoItem,
        isFinished: false,
      },
    ]);
  };

  const onTodoItemClick = (clickedTodoItem) => {
    setTodoItemList(
      todoItemList.map((todoItem) => {
        if (clickedTodoItem.id === todoItem.id) {
          return {
            id: clickedTodoItem.id,
            todoItemContent: clickedTodoItem.todoItemContent,
            isFinished: !clickedTodoItem.isFinished,
          };
        } else {
          return todoItem;
        }
      })
    );
  };

  return (
    <div className="App">
      <TodoItemInputField onSubmit={onSubmit} />
      <TodoItemList
        todoItemList={todoItemList}
        onTodoItemClick={onTodoItemClick}
      />
    </div>
  );
}

export default App;
