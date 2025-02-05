"use client";
import { updateIsDoneApi } from "@/lid/todoApi";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type IsDoneType = {
  id: string;
  isDone: boolean;
  type: string;
};

export type UpdateIsDoneType = {
  id: string;
  updateIsDone: boolean;
};

const IsDoneButton = ({ id, isDone, type }: IsDoneType) => {
  const [updateIsDone, setUpdateIsDone] = useState<boolean>(isDone);

  const handleClick = async () => {
    const result = await updateIsDoneApi({ id, updateIsDone: !updateIsDone });
    if (result) {
      setUpdateIsDone(!updateIsDone);
    }
  };

  return (
    <>
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
        onClick={handleClick}
      >
        {updateIsDone ? "완료" : "미완료"}
      </Button>
    </>
  );
};

export default IsDoneButton;
