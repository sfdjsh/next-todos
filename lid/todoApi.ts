import { HandleTodoType } from "@/models/types";

export const fetchTodoApi = async () => {
  const response = await fetch("http://localhost:3000/api/todos", {
    cache: "no-store",
  });
  return response.json();
};

export const detailTodoApi = async (id:string) => {
  const response = await fetch(`http://localhost:3000/api/todos/${id}`);
  return response.json();
};


export const createTodoApi = async ({ title, content }: HandleTodoType) => {
  await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    cache: "no-store",
  });
};

export const deleteTodoApi = async (id:string) => {
  const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method:'DELETE'
  })
  return response.ok
}