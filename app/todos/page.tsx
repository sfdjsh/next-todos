import { fetchTodoApi } from "@/lid/todoApi";
import TodoList from "@/components/TodoList";
import PageNation from "@/components/PageNation";
import Loading from "@/components/Loading";

const TodoPage = async ({
  searchParams,
}: {
  searchParams: { page: number };
}) => {
  const { page } = await searchParams;
  const response = await fetchTodoApi(page);
  const todos = response.data;

  return (
    <>
      <TodoList todos={todos} />
      <PageNation
        totalPages={response.total_pages}
        currentPage={response.current_pages}
      />
    </>
  );
};

export default TodoPage;
