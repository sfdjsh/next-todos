"use client";
import { updateIsDoneApi } from "@/lid/todoApi";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type IsDoneType = {
  id: string;
  isDone: boolean;
};

export type UpdateIsDoneType = {
  id: string;
  updateIsDone: boolean
}

const IsDoneButton = ({ id, isDone }: IsDoneType) => {
  const router = useRouter();
  const [updateIsDone, setUpdateIsDone] = useState<boolean>(isDone);

  useEffect(() => {
    const updateData = async () => {
      const result = await updateIsDoneApi({ id, updateIsDone });
      if (result) {
        router.refresh();
      }
    };
    updateData();
  }, [updateIsDone]);

  return (
    <>
      <Button
        variant="contained"
        color={isDone ? "success" : "warning"}
        onClick={() => setUpdateIsDone(!updateIsDone)}
      >
        {isDone ? "완료" : "미완료"}
      </Button>
    </>
  );
};

export default IsDoneButton;
