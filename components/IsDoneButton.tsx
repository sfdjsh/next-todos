"use client";
import { updateIsDoneApi } from "@/lib/todoApi";
import { Button } from "@mui/material";
import { useState } from "react";

export type IsDoneType = {
  id: string;
  isDone: boolean;
  type: string;
};

const IsDoneButton = ({ id, isDone, type }: IsDoneType) => {
  const [updateIsDone, setUpdateIsDone] = useState<boolean>(isDone);

  const handleUpdateIsDone = async () => {
    const response = await updateIsDoneApi({ id, updateIsDone: !updateIsDone });
    if (response) setUpdateIsDone(!updateIsDone);
  };

  return (
    <Button
      variant="contained"
      color={updateIsDone ? "success" : "warning"}
      sx={
        type === "calendar"
          ? (theme) => ({
              [theme.breakpoints.down("md")]: { mt: 1 },
            })
          : (theme) => ({
              [theme.breakpoints.down("md")]: {
                fontSize: "0.75rem",
                height: "32px",
                p: 1,
              },
            })
      }
      onClick={handleUpdateIsDone}
    >
      {updateIsDone ? "완료" : "미완료"}
    </Button>
  );
};

export default IsDoneButton;
