"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import UpdateModal from "./UpdateModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const UpdateButton = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [todoId, setTodoId] = useState<string | null>(null);

  const handleOpen = (id: string) => {
    setTodoId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setTodoId(null);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => handleOpen(id)}>
        <MoreVertIcon />
      </Button>
      {todoId && (
        <UpdateModal open={open} handleClose={handleClose} id={todoId} />
      )}
    </>
  );
};

export default UpdateButton;
