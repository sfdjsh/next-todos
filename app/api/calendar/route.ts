import { NextRequest, NextResponse } from "next/server";
import { includedTodayTodo } from "@/data/fireStore";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const date = searchParams.get('date')
  const data = await includedTodayTodo({date});
  const response = {
    message: "기간 할일 조회",
    data,
  };

  return Response.json(response);
}