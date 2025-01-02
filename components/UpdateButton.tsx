"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UpdateModal from "./UpdateModal";

const UpdateButton = ({ id }: { id: string }) => {
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
        <EditIcon />
      </Button>
      {modalId && (
        <UpdateModal open={open} handleClose={handleClose} id={modalId} />
      )}
    </>
  );
};

export default UpdateButton;
