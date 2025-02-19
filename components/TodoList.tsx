import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Tooltip,
} from "@mui/material";
import { TodoDataType } from "@/models/types";
import IsDoneButton from "./IsDoneButton";
import UpdateButton from "./UpdateButton";

const TodoList = ({ todos }: { todos: TodoDataType[] }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                width: "25%",
                backgroundColor: "#D4F4FA",
                fontWeight: "bold",
              }}
            >
              제목
            </TableCell>
            <TableCell
              align="center"
              sx={{
                width: "5%",
                backgroundColor: "#D4F4FA",
                fontWeight: "bold",
                whiteSpace: "nowrap",
              }}
            >
              완료 여부
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: "#D4F4FA",
                fontWeight: "bold",
                textAlign: "center",
                width: "20%",
                whiteSpace: "nowrap",
              }}
            >
              기간
            </TableCell>
            <TableCell
              sx={{
                width: "5%",
                backgroundColor: "#D4F4FA",
                fontWeight: "bold",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              상세보기
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.length >= 1 ? (
            <>
              {todos.map((data) => (
                <TableRow key={data.id}>
                  <Tooltip title={data.title} arrow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "150px",
                        cursor: "default",
                      }}
                    >
                      {data.title}
                    </TableCell>
                  </Tooltip>
                  <TableCell align="center">
                    <IsDoneButton
                      id={data.id}
                      isDone={data.isDone}
                      type="table"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        display: { xs: "block", md: "inline" },
                        textAlign: { xs: "center" },
                        fontSize: { xs: "0.7rem", md: "1rem" },
                      }}
                    >
                      {`${data.startAt}`}
                    </Typography>
                    <Typography
                      sx={{
                        display: { xs: "block", md: "inline" },
                        textAlign: { xs: "center" },
                        fontSize: { xs: "0.7rem", md: "1rem" },
                      }}
                    >
                      {" ~ "}
                    </Typography>
                    <Typography
                      sx={{
                        display: { xs: "block", md: "inline" },
                        textAlign: { xs: "center" },
                        fontSize: { xs: "0.7rem", md: "1rem" },
                      }}
                    >
                      {`${data.endAt}`}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <UpdateButton id={data.id} />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ height: "500px" }}>
                <Typography variant="h6" color="textSecondary">
                  할 일을 등록해주세요.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodoList;
