"use client";
import { Box, Modal, TextField, Button, Typography } from "@mui/material";
import { Textarea } from "@mui/joy";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTodoApi } from "@/lid/todoApi";
import { ModalType, HandleTodoType } from "@/models/types";
import MyDatePicker from "./MyDatePicker";
import dayjs, { Dayjs } from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TodoModal = ({ open, handleClose }: ModalType) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startValue, setStartValue] = useState<Dayjs>(
    dayjs("2025-01-17")
  );
  const [endValue, setEndValue] = useState<Dayjs>(dayjs("2025-01-17"));

  const handleTodo = async ({ title, content, startValue, endValue }: any) => {
    await createTodoApi({ title, content, startValue, endValue });
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
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ ml: 0.5, fontWeight: "bold" }}>제목*</Typography>
            <TextField
              id={title}
              autoFocus
              required
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ ml: 0.5, fontWeight: "bold" }}>내용</Typography>
            <Textarea
              id={content}
              minRows={5}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)
              }
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ ml: 0.5, fontWeight: "bold" }}>기간</Typography>
            <MyDatePicker
              startValue={startValue}
              endValue={endValue}
              setStartValue={setStartValue}
              setEndValue={setEndValue}
            />
          </Box>
          <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              onClick={() => handleTodo({ title, content, startValue, endValue })}
            >
              등록
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
