"use client";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import TodoModal from "./CreateModal";

const CreateButton = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ textAlign: "right", mb: 1 }}>
        <Button
          variant="outlined"
          sx={{ backgroundColor: "#D7F9F8" }}
          onClick={handleOpen}
        >
          등록
        </Button>
      </Box>
      <TodoModal open={open} handleClose={handleClose} />
    </>
  );
};

export default CreateButton;
