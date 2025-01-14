"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { TodoDataType } from "@/models/types";
import { fetchTodoApi } from "@/lid/todoApi";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";
import IsDoneButton from "./IsDoneButton";
import SearchInput from "./SearchInput";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoDataType[]>([]);
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetchTodoApi();
      const result = response.data;
      setTodos(result);
    };
    fetchTodos();
  }, []);

  console.log(todos);

  return (
    <>
      <SearchInput setTodos={setTodos} />
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
            {todos.map((data: TodoDataType) => (
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
    </>
  );
};

export default TodoList;
