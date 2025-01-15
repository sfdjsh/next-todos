import { fetchTodos, createTodos } from "@/data/fireStore"

// 전체 할 일 조회
export async function GET(request: Request) {
  const data = await fetchTodos();
  const response = {
    message: "전체 할일 조회",
    data,
  };

  return Response.json(response);
}

// 할 일 추가
export async function POST(request: Request) {
  const { title, content, startAt, endAt } = await request.json();
  const addTodo = await createTodos({title, content, startAt, endAt})
  const response = {
    message: "할일 생성",
    addTodo,
  };

  return Response.json(response);
}
