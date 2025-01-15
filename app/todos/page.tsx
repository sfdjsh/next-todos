import { Typography } from "@mui/material";
import { fetchTodoApi } from "@/lid/todoApi";
import SearchInput from "@/components/SearchInput";
import TodoList from "@/components/TodoList";
import CreateButton from "@/components/CreateButton";

const TodoPage = async () => {
  const response = await fetchTodoApi();
  const todos = response.data

  return (
    <>
      <TodoList todos={todos} />
    </>
  );
};

export default TodoPage;