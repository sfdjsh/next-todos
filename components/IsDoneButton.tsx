"use client";
import { updateIsDoneApi } from "@/lib/todoApi";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { IsDoneType } from "@/models/types";

const IsDoneButton = ({ id, isDone, type }: IsDoneType) => {
  const router = useRouter();

  const handleUpdateIsDone = async () => {
    const response = await updateIsDoneApi({ id, updateIsDone: !isDone });
    if (response) {
      router.refresh();
    }
  };

  return (
    <Button
      variant="contained"
      color={isDone ? "success" : "warning"}
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
      {isDone ? "완료" : "미완료"}
    </Button>
  );
};

export default IsDoneButton;
