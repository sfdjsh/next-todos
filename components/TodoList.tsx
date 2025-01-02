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
import { TodoDataType } from "@/models/types";
import { fetchTodoApi } from "@/lid/todoApi";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";

const TodoList = async () => {
  const result = await fetchTodoApi();

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
            {result.data.map((data: TodoDataType) => (
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
                  <UpdateButton id={data.id} />
                </TableCell>
                <TableCell>
                  <DeleteButton id={data.id} />
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
