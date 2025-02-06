import { searchTodo } from "@/data/fireStore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const field = searchParams.get('field')
  const input = searchParams.get('input')
  if (field && input) {
    const data = await searchTodo({field, input});
    const response = {
      message: '검색 조회 성공',
      data
    }
    return Response.json(response)
  }
}