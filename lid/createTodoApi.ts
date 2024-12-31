import { HandleTodoType } from "@/models/types";

export const handleTodoApi = async ({ title, content }: HandleTodoType) => {
  await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
  });
};
