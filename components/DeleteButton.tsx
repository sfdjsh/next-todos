"use client";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTodoApi } from "@/lid/todoApi";
import { useRouter } from "next/navigation";

const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const deleteTodo = async (id: string) => {
    const result = await deleteTodoApi(id);
    if (result) {
      router.refresh();
    }
  };

  return (
    <Button color="error" onClick={() => deleteTodo(id)}>
      <DeleteIcon />
    </Button>
  );
};

export default DeleteButton;
