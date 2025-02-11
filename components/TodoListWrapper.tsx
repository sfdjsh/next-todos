"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchTodoApi } from "@/lib/todoApi";
import TodoList from "@/components/TodoList";
import PageNation from "@/components/PageNation";

const TodoListWrapper = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [todos, setTodos] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchTodoApi(page);
      setTodos(response.data);
      setTotalPages(response.total_pages);
    };
    fetchData();
  }, [page]);

  return (
    <>
      <TodoList todos={todos} />
      <PageNation totalPages={totalPages} currentPage={page} />
    </>
  );
};

export default TodoListWrapper;