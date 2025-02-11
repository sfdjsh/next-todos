"use client";
import { useSearchParams } from "next/navigation";
import { fetchSearchTodoApi } from "@/lib/todoApi";
import SearchTodoList from "@/components/SearchTodoList";
import { useEffect, useState } from "react";

const SearchWrapper = () => {
  const searchParams = useSearchParams();
  const field = searchParams.get("field") || "";
  const input = searchParams.get("input") || "";

  const [searchTodos, setSearchTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchSearchTodoApi({ field, searchInput: input });
      setSearchTodos(response.data);
    };
    fetchData();
  }, [field, input]);

  return (
    <SearchTodoList searchTodos={searchTodos} input={input} />
  );
};

export default SearchWrapper;
