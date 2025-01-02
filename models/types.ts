export type TodoDataType = {
  id: string;
  title: string;
  content?: string;
  is_done: boolean;
};

export type HandleTodoType = {
  title: string;
  content: string;
}

export type ModalType = {
  open: boolean;
  handleClose(): void;
}

export type UpdateModalType = {
  open: boolean;
  handleClose(): void;
  id: string
}
