"use client";
import { updateIsDoneApi } from "@/lid/todoApi";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type IsDoneType = {
  id: string;
  isDone: boolean;
};

export type UpdateIsDoneType = {
  id: string;
  updateIsDone: boolean;
};

const IsDoneButton = ({ id, isDone }: IsDoneType) => {
  const [updateIsDone, setUpdateIsDone] = useState<boolean>(isDone);

  const handleClick = async () => {
    const result = await updateIsDoneApi({ id, updateIsDone : !updateIsDone });
    if (result) {
      setUpdateIsDone(!updateIsDone)
    }
  }

  return (
    <Button
      variant="contained"
      color={updateIsDone ? "success" : "warning"}
      onClick={handleClick}
    >
      {updateIsDone ? "완료" : "미완료"}
    </Button>
  );
};

export default IsDoneButton;
