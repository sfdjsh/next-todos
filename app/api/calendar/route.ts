import { NextRequest } from "next/server";
import { includedPeriodTodo } from "@/data/fireStore";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const date = searchParams.get('date')
  console.log("date:", date)

  const data = await includedPeriodTodo({date});
  const response = {
    message: "기간 할일 조회",
    data,
  };

  return Response.json(response);
}