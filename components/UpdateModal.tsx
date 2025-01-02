"use client";
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Textarea } from "@mui/joy";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createTodoApi, detailTodoApi } from "@/lid/todoApi";
import { ModalType, UpdateModalType } from "@/models/types";

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

const UpdateModal = ({ open, handleClose, id }: UpdateModalType) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (open && id) {
      const fetchData = async () => {
        const result = await detailTodoApi(id);
        setTitle(result.data.title);
        setContent(result.data.content);
        setIsDone(result.data.is_done);
      };
      fetchData();
    }
  }, []);

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
            autoFocus
            id={title}
            label="제목"
            required
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            value={title}
          />
          <Textarea
            id={content}
            placeholder="내용"
            minRows={10}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
            value={content || "작성한 내용이 없습니다."}
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="space-between">
            <Typography>완료 여부</Typography>
            <Grid container spacing={1}>
              <Grid>
                <Button variant={isDone ? "contained" : "text"}>완료</Button>
              </Grid>
              <Grid>
                <Button variant={isDone ? "text" : "contained"}>미완료</Button>
              </Grid>
            </Grid>
          </Box>
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
            >
              수정
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

export default UpdateModal;
