"use client";
import { Box, Modal, TextField, Button, Typography } from "@mui/material";
import { Textarea } from "@mui/joy";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTodoApi } from "@/lib/todoApi";
import { CreateModalType, CreateTodoType } from "@/models/types";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateTodoModal = ({ open, handleClose }: CreateModalType) => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const today = dayjs(new Date());
  const [startAt, setStartAt] = useState<Dayjs | null>(dayjs());
  const [endAt, setEndAt] = useState<Dayjs | null>(dayjs());

  const handleCreateTodo = async ({
    title,
    content,
    startAt,
    endAt,
  }: CreateTodoType) => {
    if (title.length < 1) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!startAt || !endAt || startAt > endAt) {
      alert("종료일은 시작일과 같거나 더 늦게 설정해야 합니다.");
      return;
    }

    await createTodoApi({ title, content, startAt, endAt });
    setStartAt(dayjs(today));
    setEndAt(dayjs(today));
    router.refresh();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
          <Typography sx={{ ml: 0.5, mb: 2, fontWeight: "bold" }}>
            기간
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box display="flex" alignItems="center">
              <DatePicker
                format="YYYY-MM-DD"
                label="시작일"
                value={startAt}
                onChange={(newValue: Dayjs | null) => setStartAt(newValue)}
              />
              <Typography sx={{ px: 1 }}> ~ </Typography>
              <DatePicker
                format="YYYY-MM-DD"
                label="종료일"
                value={endAt}
                onChange={(newValue: Dayjs | null) => setEndAt(newValue)}
              />
            </Box>
          </LocalizationProvider>
        </Box>
        <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            sx={{ mx: 1 }}
            onClick={() => handleCreateTodo({ title, content, startAt, endAt })}
          >
            등록
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            취소
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateTodoModal;
