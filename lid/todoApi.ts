import { HandleTodoType } from "@/models/types";
import { UpdateIsDoneType } from "@/components/IsDoneButton";
import { TodoDataType } from "@/models/types";

export const fetchTodoApi = async (currentPage: number) => {
  if (currentPage) {
    const response = await fetch(
      `http://localhost:3000/api/todos?page=${currentPage}`,
      {
        cache: "no-store",
      }
    );

    return response.json();
  }
};

export const detailTodoApi = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
    cache: "no-store",
  });
  return response.json();
};

export const createTodoApi = async ({
  title,
  content,
  startAt,
  endAt,
}: any) => {
  const response = await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
      startAt,
      endAt,
    }),
    cache: "no-store",
  });
  return response.json();
};

export const deleteTodoApi = async (id: string) => {
  console.log(id);
  const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "DELETE",
  });
  return response.ok;
};

export const updateIsDoneApi = async ({
  id,
  updateIsDone,
}: UpdateIsDoneType) => {
  const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      isDone: updateIsDone,
    }),
    // cache: "no-store",
  });

  console.log(response);

  return response.ok;
};

export const updateTodoApi = async ({
  id,
  title,
  content,
  isDone,
  startAt,
  endAt,
}: TodoDataType) => {
  const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      title,
      content,
      isDone,
      startAt,
      endAt,
    }),
  });
  return response.ok;
};

export const fetchSearchTodoApi = async ({ field, searchInput }: any) => {
  const response = await fetch(
    `http://localhost:3000/api/search?field=${field}&input=${searchInput}`,
    {
      cache: "no-store",
    }
  );
  return response.json();
};
