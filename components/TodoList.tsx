import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { TodoDataType } from "@/models/types";
import { fetchTodoApi } from "@/lid/todoApi";
import UpdateButton from "./UpdateButton";
import IsDoneButton from "./IsDoneButton";
import SearchInput from "./SearchInput";

const TodoList = ({
  todos,
}: // onUpdateTodo,
{
  todos: TodoDataType[];
  // onUpdateTodo: (id: string, updateIsDone: boolean) => void;
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: "#D4F4FA", fontWeight: "bold" }}>
              제목
            </TableCell>
            <TableCell sx={{ backgroundColor: "#D4F4FA", fontWeight: "bold" }}>
              완료 여부
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: "#D4F4FA",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              기간
            </TableCell>
            <TableCell sx={{ backgroundColor: "#D4F4FA", fontWeight: "bold" }}>
              상세보기
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((data) => (
            <TableRow key={data.id}>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "150px",
                }}
              >
                {data.title}
              </TableCell>
              <TableCell>
                <IsDoneButton id={data.id} isDone={data.isDone} type="table" />
              </TableCell>
              <TableCell align="center">
                <Typography
                  sx={{
                    display: {xs: "block", md: "inline"
                    },
                    textAlign: {
                      xs: "center",
                    },
                    fontSize: {
                      xs: "0.7rem",
                      md:"1rem"
                    }
                  }}
                >
                  {`${data.startAt}`}
                </Typography>
                <Typography
                  sx={{
                    display: {
                      xs: "block",
                      md: "inline"
                    },
                    textAlign: {
                      xs: "center",
                    },
                    fontSize: {
                      xs: "0.7rem",
                      md:"1rem"
                    }
                  }}
                >
                  {" ~ "}
                </Typography>
                <Typography
                  sx={{
                    display: {
                      xs: "block",
                      md: "inline"
                    },
                    textAlign: {
                      xs: "center",
                    },
                    fontSize: {
                      xs: "0.7rem",
                      md:"1rem"
                    }
                  }}
                >{`${data.startAt}`}</Typography>
              </TableCell>
              <TableCell>
                <UpdateButton id={data.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodoList;
