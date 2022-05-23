import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const Todos = ({ todos }) => {
    return (
      <div className="todos">
        <ul>
          <div className="headerList">
            <li>Nome</li>
            <li>Preco</li>
            <li>Estoque</li>
            <li>Ações</li>
          </div>
          <hr/>
          {todos.map((todo) => {
            return (
              <div className="todo">
                <li>{todo.nome}</li>
                <li>{todo.preco}</li>
                <li>{todo.estoque}</li>
                <button onClick={() => handleWithEditButtonClick(todo)}>
                  <AiOutlineEdit size={20} color={"#64697b"}></AiOutlineEdit>
                </button>
                <button onClick={() => deleteTodo(todo)}>
                  <AiOutlineDelete size={20} color={"#64697b"}></AiOutlineDelete>
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    );
  };

  async function handleWithNewButton() {
    console.log("fasfas");
    setInputVisility(!inputVisbility);
  }
  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo);
    setInputVisility(true);
  }
  async function getTodos() {
    const response = await axios.get("http://localhost:3030/list-produtos");
    setTodos(response.data);
  }
  async function editTodo() {
    const response = await axios.put("http://localhost:3030/update-produto/", {
      id: selectedTodo.id,
      nome: inputValueNome,
      preco: inputValuePreco,
      estoque: inputValueEstoque,
    });
    setSelectedTodo();
    setInputVisility(false);
    getTodos();

  }
  async function deleteTodo(todo) {
    const response = await axios.delete(`http://localhost:3030/delete-produto/${todo.id}`
    );
    getTodos();
  }

  async function createTodo() {
    const response = await axios.post("http://localhost:3030/create-produto", {
      nome: inputValueNome,
      preco: inputValuePreco,
      estoque: inputValueEstoque,
    });
    getTodos();
    setInputVisility(!inputVisbility);
    setInputValueNome("");
    setInputValuePreco("");
    setInputValueEstoque("");
  }

  const [todos, setTodos] = useState([]);
  const [inputValueNome, setInputValueNome] = useState("");
  const [inputValuePreco, setInputValuePreco] = useState("");
  const [inputValueEstoque, setInputValueEstoque] = useState("");
  const [inputVisbility, setInputVisility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Produtos</h1>
        </div>
        <Todos todos={todos}></Todos>
        <input
          placeholder="Digite o nome do Produto"
          value={inputValueNome}
          style={{ display: inputVisbility ? "block" : "none" }}
          onChange={(event) => {
            setInputValueNome(event.target.value);
          }}
          className="inputName"
        />
        <input
          placeholder="Digite o preço do Produto"
          value={inputValuePreco}
          style={{ display: inputVisbility ? "block" : "none" }}
          onChange={(event) => {
            setInputValuePreco(event.target.value);
          }}
          className="inputName"
        />
        <input
          placeholder="Digite o estoque do Produto"
          value={inputValueEstoque}
          style={{ display: inputVisbility ? "block" : "none" }}
          onChange={(event) => {
            setInputValueEstoque(event.target.value);
          }}
          className="inputName"
        />

        <button
          onClick={
            inputVisbility
              ? selectedTodo
                ? editTodo
                : createTodo
              : handleWithNewButton
          }
          className="newTaskButton"
        >
          {inputVisbility ? "Confirmar" : "Cadastrar Produto"}
        </button>
      </header>
    </div>
  );
}

export default App;
