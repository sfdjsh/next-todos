import { CreateTodoType, TodoDataType, UpdateIsDoneType } from "@/models/types";
import { notFound } from "next/navigation";
import { SearchTodoType } from "@/models/types";

const baseURL = process.env.BASE_URL
// 할일 조회 API
export const fetchTodoApi = async (currentPage: number) => {
  if (!currentPage) notFound();

  const response = await fetch(
    `${baseURL}/api/todos?page=${currentPage ? currentPage : 1}`,
    {
      cache: "no-store",
    }
  );
  return response.json();
};

// 할일 상세보기 API
export const detailTodoApi = async (id: string) => {
  const response = await fetch(`${baseURL}/api/todos/${id}`, {
    cache: "no-store",
  });
  return response.json();
};

// 할일 생성 API
export const createTodoApi = async ({
  title,
  content,
  startAt,
  endAt,
}: CreateTodoType) => {
  const response = await fetch(`${baseURL}/api/todos`, {
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

// 할일 삭제 API
export const deleteTodoApi = async (id: string) => {
  const response = await fetch(`${baseURL}/api/todos/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });
  return response.ok;
};

// 완료 여부 수정 API
export const updateIsDoneApi = async ({
  id,
  updateIsDone,
}: UpdateIsDoneType) => {
  const response = await fetch(`${baseURL}/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      isDone: updateIsDone,
    }),
    cache: "no-store",
  });
  return response.ok;
};

// 할 일 수정 API
export const updateTodoApi = async ({
  id,
  title,
  content,
  isDone,
  startAt,
  endAt,
}: TodoDataType) => {
  const response = await fetch(`${baseURL}/api/todos/${id}`, {
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

// 할 일 검색 API
export const fetchSearchTodoApi = async ({
  field,
  searchInput,
}: SearchTodoType) => {
  const response = await fetch(
    `${baseURL}/api/todos/search?field=${field}&input=${searchInput}`,
    {
      cache: "no-store",
    }
  );
  return response.json();
};

// 오늘 날짜 할 일 API
export const fetchTodayTodoApi = async (date: string) => {
  const response = await fetch(
    `${baseURL}/api/calendar?date=${date}`,
    {
      cache: "no-store",
    }
  );
  return response.json();
};
