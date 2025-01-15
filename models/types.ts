import dayjs, { Dayjs } from "dayjs";

export type TodoDataType = {
  id: string;
  title: string;
  content?: string;
  isDone: boolean;
  startAt?: Dayjs | null;
  endAt?: Dayjs | null;
};

export type HandleTodoType = {
  title: string;
  content: string;
};

export type ModalType = {
  open: boolean;
  handleClose(): void;
};

export type UpdateModalType = {
  open: boolean;
  handleClose(): void;
  id: string;
};

export type SearchType = {
  field: string;
  searchInput: string;
};
