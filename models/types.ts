import { Dayjs } from "dayjs";

export type TodoDataType = {
  id: string;
  title: string;
  content?: string;
  isDone: boolean;
  startAt: Dayjs | null;
  endAt: Dayjs | null;
};

export type CreateTodoType = {
  title: string;
  content: string;
  startAt: Dayjs | null;
  endAt: Dayjs | null;
};

export type IsDoneType = {
  id: string;
  isDone: boolean;
  type: string;
};

export type UpdateIsDoneType = {
  id: string;
  updateIsDone: boolean;
};

export type CalendarTodoType = {
  id: string;
  title: string;
  content?: string;
  isDone: boolean;
  startAt: string;
  endAt: string;
};

export type CreateModalType = {
  open: boolean;
  handleClose(): void;
};

export type UpdateModalType = {
  id: string;
  open: boolean;
  handleClose(): void;
};

export type SearchTodoType = {
  field: string;
  searchInput: string;
};
