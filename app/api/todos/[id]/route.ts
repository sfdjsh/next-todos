import {
  deleteTodo,
  fetchSingleTodo,
  updateTodo,
  updateIsDoneTodo,
} from "@/data/fireStore";

// 단일 할 일 조회
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const data = await fetchSingleTodo(id);

  if (!data) {
    return new Response("id로 조회한 할 일이 없습니다.");
  }

  const response = {
    message: "단일 할일 조회",
    data,
  };
  return Response.json(response);
}

// export async function GET(
//   request: Request,
//   { params }: { params: { page: number } }
// ) {
//   return ;
// }

// 할 일 삭제
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  if (!id) return;
  const deletedTodo = await deleteTodo(id);
  if (deletedTodo) {
    return new Response("할일 삭제 성공");
  } else {
    return new Response("할일 삭제 실패");
  }
}

// 할 일 수정
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
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

    return Response.json(response);
  } else {
    const updateData = await updateIsDoneTodo({ id, isDone });
    const response = {
      message: "할 일 완료 여부 수정 성공",
      data: updateData,
    };

    return Response.json(response);
  }
}
