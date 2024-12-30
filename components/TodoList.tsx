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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { todoDataType } from "@/models/types";

const fetchTodo = async () => {
  const response = await fetch("http://localhost:3000/api/todos");
  const result = await response.json();
  return result;
};

const TodoList = async () => {
  const result = await fetchTodo();

  return (
    <>
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
                colSpan={2}
                align="center"
                sx={{ backgroundColor: "#D4F4FA", fontWeight: "bold" }}
              >
                수정 및 삭제
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.data.map((data: todoDataType) => (
              <TableRow key={data.id}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold" }}
                >
                  {data.title}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={data.is_done ? "success" : "warning"}
                  >
                    {data.is_done ? "완료" : "미완료"}
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button>
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button color="error">
                    <DeleteIcon />
                  </Button>
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
