import { fetchTodos, createTodos } from "@/data/fireStore";
import { NextRequest } from "next/server";

// 전체 할 일 조회
export async function GET(request: NextRequest) {
  const data = await fetchTodos();

  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const slice_data = data.slice((page - 1) * 10, page * 10);
  const total_pages = Math.ceil(data.length / 10);
  const response = {
    message: "전체 할일 조회",
    data: slice_data,
    current_pages: page,
    total_pages,
  };
  return Response.json(response);
}

// 할 일 추가
export async function POST(request: Request) {
  const { title, content, startAt, endAt } = await request.json();
  const addTodo = await createTodos({ title, content, startAt, endAt });
  const response = {
    message: "할일 생성",
    addTodo,
  };

  return Response.json(response);
}
