import { Typography } from "@mui/material";
import CreateButton from "@/components/CreateTodoButton";
import SearchTodoInput from "@/components/SearchTodoInput";
import { Suspense } from "react";

const TodosLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", p: 5 }}>
        스코필의 Todo 리스트
      </Typography>
      <CreateButton />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchTodoInput />
        {children}
      </Suspense>
    </>
  );
};

export default TodosLayout;
