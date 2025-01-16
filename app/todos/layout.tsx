import { Typography } from "@mui/material";
import CreateButton from "@/components/CreateButton";
import SearchInput from "@/components/SearchInput";
import PageNation from "@/components/PageNation";

const TodosLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", p: 5 }}>
        스코필의 Todo 리스트
      </Typography>
      <CreateButton />
      <SearchInput />
      {children}
    </>
  );
};

export default TodosLayout;
