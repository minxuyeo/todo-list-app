import "./App.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { colors } from "@mui/material";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJINUxCGMh29PWBDTko-eSPGYlgVHr5sk",
  authDomain: "todolist-e37ec.firebaseapp.com",
  projectId: "todolist-e37ec",
  storageBucket: "todolist-e37ec.appspot.com",
  messagingSenderId: "908722150641",
  appId: "1:908722150641:web:58f7168053d0065c461d50",
  measurementId: "G-SPJ77CL2BM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Todo 아이템 버튼 눌릴때 스태이트에 추가하는 callback function 만들어서 props 로 패스하기
const db = getFirestore(app);

//투두리스트 입력칸
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
// 삭제버튼 넣기
const TodoItem = (props) => {
  const style = props.todoItem.isFinished
    ? { textDecoration: "line-through" }
    : {};
  return (
    <li>
      <span style={style} onClick={() => props.onTodoItemClick(props.todoItem)}>
        {props.todoItem.todoItemContent}
      </span>
      <Button
        variant="outlined"
        onClick={() => props.onRemoveClick(props.todoItem)}
      >
        Remove
      </Button>
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
        onRemoveClick={props.onRemoveClick}
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

  const onSubmit = async (newTodoItem) => {
    const docRef = await addDoc(collection(db, "todoItem"), {
      todoItemContent: newTodoItem,
      isFinished: false,
    });

    setTodoItemList([
      ...todoItemList,
      {
        id: docRef.id,
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

  const onRemoveClick = (removedTodoItem) => {
    setTodoItemList(
      todoItemList.filter((todoItem) => {
        return todoItem.id !== removedTodoItem.id;
      })
    );
  };

  return (
    <div className="App">
      <TodoItemInputField onSubmit={onSubmit} />
      <TodoItemList
        todoItemList={todoItemList}
        onTodoItemClick={onTodoItemClick}
        onRemoveClick={onRemoveClick}
      />
    </div>
  );
}

export default App;

//프론트딴에서는 다 완료, 하지만 새로고침하면 다 날라간다.
// 이거 저장하고싶으면 백엔드에 저장을 해야함, 그러기 위해서는 백엔드 필요함
