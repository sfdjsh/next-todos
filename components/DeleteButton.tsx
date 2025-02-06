"use client";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTodoApi } from "@/lib/todoApi";
import { useRouter } from "next/navigation";

const DeleteButton = ({
  id,
  handleClose,
}: {
  id: string;
  handleClose(): void;
}) => {
  const router = useRouter();
  const deleteTodo = async (id: string) => {
    const result = await deleteTodoApi(id);
    if (result) {
      alert("정상적으로 삭제되었습니다.");
      handleClose();
      router.refresh();
    }
  };

  return (
    <Button
      variant="contained"
      sx={{ mr: 1 }}
      color="error"
      onClick={() => {
        if (confirm("정말 삭제하시겠습니까?")) {
          deleteTodo(id);
        }
      }}
    >
      <DeleteIcon />
      삭제
    </Button>
  );
};

export default DeleteButton;
