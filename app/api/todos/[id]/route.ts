import {
  deleteTodo,
  fetchSingleTodo,
  updateTodo,
  updateIsDoneTodo,
} from "@/data/fireStore";
import { NextRequest, NextResponse } from "next/server";

// 단일 할 일 조회
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }>}) {
  const { id } = await context.params;
  const data = await fetchSingleTodo(id);

  if (!data) {
    return new NextResponse("id로 조회한 할 일이 없습니다.", { status: 404 });
  }

  const response = {
    message: "단일 할일 조회",
    data,
  };
  return NextResponse.json(response);
}

// 할 일 삭제
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }>}) {
  const { id } = await context.params;
  if (!id) return new NextResponse("id가 필요합니다.", { status: 400 });
  const deletedTodo = await deleteTodo(id);
  if (deletedTodo) {
    return new NextResponse("할일 삭제 성공");
  } else {
    return new NextResponse("할일 삭제 실패", { status: 500 });
  }
}

// 할 일 수정
export async function PUT(
  request: NextRequest, context: { params: Promise<{ id: string }>}
) {
  const { id } = await context.params;
  const { title, content, isDone, startAt, endAt } = await request.json();
  if (title && content) {
    const updateData = await updateTodo({
      id,
      title,
      content,
      isDone,
      startAt,
      endAt,
    });
    const response = {
      message: "할 일 수정 성공",
      data: updateData,
    };
    return NextResponse.json(response);
  } else {
    const updateData = await updateIsDoneTodo({ id, isDone });
    const response = {
      message: "할 일 완료 여부 수정 성공",
      data: updateData,
    };
    return NextResponse.json(response);
  }
}
