import { fetchSearchTodoApi } from "@/lib/todoApi";
import SearchTodoList from "@/components/SearchTodoList";

const SearchedTodos = async ({
  searchParams,
}: {
  searchParams: Promise<{ field: string; input: string }>;
}) => {
  const { field } = await searchParams;
  const { input } = await searchParams;
  const response = await fetchSearchTodoApi({ field, searchInput: input });
  const searchTodos = response.data;

  return (
    <SearchTodoList searchTodos={searchTodos} input={input} />
  );
};

export default SearchedTodos;
