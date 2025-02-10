"use client";
import { UpdateModalType, TodoDataType } from "@/models/types";
import { detailTodoApi, updateTodoApi } from "@/lib/todoApi";
import DeleteButton from "./DeleteButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Modal, TextField, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Textarea } from "@mui/joy";
import dayjs, { Dayjs } from "dayjs";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 2,
  pb: 4,
};

const UpdateModal = ({ id, open, handleClose }: UpdateModalType) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [startAt, setStartAt] = useState<Dayjs | null>(dayjs());
  const [endAt, setEndAt] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    if (open && id) {
      const fetchData = async () => {
        const result = await detailTodoApi(id);
        setTitle(result.data.title);
        setContent(result.data?.content);
        setIsDone(result.data.isDone);
        setStartAt(dayjs(result.data.startAt));
        setEndAt(dayjs(result.data.endAt));
      };
      fetchData();
    }
  }, []);

  const updateData = async ({
    id,
    title,
    content,
    isDone,
    startAt,
    endAt,
  }: TodoDataType) => {
    const result = await updateTodoApi({
      id,
      title,
      content,
      isDone,
      startAt,
      endAt,
    });

    if (result) {
      alert("할 일이 정상적으로 수정되었습니다.");
      router.refresh();
    }
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
          <Box display="flex" justifyContent="end">
            <Button
              sx={{ mr: 1 }}
              variant="contained"
              onClick={() =>
                updateData({ id, title, content, isDone, startAt, endAt })
              }
            >
              <ModeEditIcon /> 수정
            </Button>
            <DeleteButton id={id} handleClose={handleClose} />
            <Button
              variant="contained"
              sx={{ bgcolor: "black" }}
              onClick={handleClose}
            >
              <CloseIcon /> 닫기
            </Button>
          </Box>
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
              value={title}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ ml: 0.5, fontWeight: "bold" }}>내용</Typography>
            <Textarea
              placeholder="작성한 내용이 없습니다."
              id={content}
              minRows={5}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)
              }
              value={content}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Typography sx={{ ml: 0.5, fontWeight: "bold" }}>
              완료 여부
            </Typography>
            <Grid container spacing={1}>
              <Grid>
                <Button
                  variant={isDone ? "contained" : "text"}
                  onClick={() => setIsDone(true)}
                >
                  완료
                </Button>
              </Grid>
              <Grid>
                <Button
                  variant={isDone ? "text" : "contained"}
                  onClick={() => setIsDone(false)}
                >
                  미완료
                </Button>
              </Grid>
            </Grid>
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
                  onChange={(value: Dayjs | null) => setStartAt(value)}
                />
                <Typography sx={{ px: 1 }}> ~ </Typography>
                <DatePicker
                  format="YYYY-MM-DD"
                  label="종료일"
                  value={endAt}
                  onChange={(value: Dayjs | null) => setEndAt(value)}
                />
              </Box>
            </LocalizationProvider>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateModal;
