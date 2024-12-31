"use client";
import { Box, Modal, TextField, Button } from "@mui/material";
import { Textarea } from "@mui/joy";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleTodoApi } from "@/lid/createTodoApi";
import { ModalType, HandleTodoType } from "@/models/types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TodoModal = ({ open, handleClose }: ModalType) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTodo = async ({ title, content }: HandleTodoType) => {
    await handleTodoApi({ title, content });
    handleClose();
    router.refresh();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id={title}
            label="제목"
            required
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <Textarea
            id={content}
            placeholder="내용"
            minRows={10}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
          />
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              onClick={() => handleTodo({ title, content })}
            >
              추가
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              취소
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TodoModal;
