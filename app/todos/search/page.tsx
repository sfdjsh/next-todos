"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchType, TodoDataType } from "@/models/types";
import { fetchSearchTodoApi } from "@/lid/todoApi";
import IsDoneButton from "@/components/IsDoneButton";
import UpdateButton from "@/components/UpdateButton";
import { useRouter } from "next/navigation";

const SearchedTodos = () => {
  const [searchTodos, setSearchTodos] = useState<TodoDataType[]>([]);
  const [searchButtonFlag, setSearchButtonFlag] = useState(true);

  const searchParams = useSearchParams();
  const field = searchParams.get("field");
  const input = searchParams.get("input");

  const router = useRouter();

  useEffect(() => {
    const handleSearchTodo = async () => {
      const response = await fetchSearchTodoApi({ field, searchInput: input });
      const result = response.data;
      setSearchTodos(result);
    };
    handleSearchTodo();
  }, []);

  useEffect(() => {
    if (!searchButtonFlag || !field || !input) router.push("/");
  });

  return (
    <>
      {searchButtonFlag && field && input && (
        <Paper>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              py: 2,
              mb: 1,
            }}
          >
            <Button
              onClick={() => {
                setSearchButtonFlag(false);
              }}
            >
              X
            </Button>
            <Typography component="span" variant="h6" color="blue">
              {input}
            </Typography>
            <Typography variant="h6">에 대한 검색 결과</Typography>
          </Box>
        </Paper>
      )}
      {searchTodos.length >= 1 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ backgroundColor: "#D4F4FA", fontWeight: "bold" }}
                >
                  제목
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#D4F4FA", fontWeight: "bold" }}
                >
                  완료 여부
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#D4F4FA", fontWeight: "bold" }}
                >
                  기간
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#D4F4FA", fontWeight: "bold" }}
                >
                  상세보기
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchTodos.map((data) => (
                <TableRow key={data.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    {data.title}
                  </TableCell>
                  <TableCell>
                    <IsDoneButton id={data.id} isDone={data.isDone} />
                  </TableCell>
                  <TableCell>{`${data.startAt} ~ ${data.endAt}`}</TableCell>
                  <TableCell>
                    <UpdateButton id={data.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h5" textAlign="center" sx={{ mt: 10 }}>
          검색 결과가 없습니다.
        </Typography>
      )}
    </>
  );
};

export default SearchedTodos;
