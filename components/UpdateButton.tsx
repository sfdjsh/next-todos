"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import UpdateModal from "./UpdateModal";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const UpdateButton = ({ id }: { id: any }) => {
  const [open, setOpen] = useState(false);
  const [modalId, setModalId] = useState<string | null>(null);

  const handleOpen = (id: string) => {
    setModalId(id); 
    setOpen(true);  
  };

  const handleClose = () => {
    setModalId(null);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => handleOpen(id)}>
        <MoreVertIcon />
      </Button>
      {modalId && (
        <UpdateModal open={open} handleClose={handleClose} id={modalId} />
      )}
    </>
  );
};

export default UpdateButton;
