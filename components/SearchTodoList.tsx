"use client"
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
  Tooltip,
} from "@mui/material";
import { TodoDataType } from "@/models/types";
import IsDoneButton from "@/components/IsDoneButton";
import UpdateButton from "@/components/UpdateButton";
import { useRouter } from "next/navigation";

const SearchTodoList = ({
  searchTodos,
  input,
}: {
  searchTodos: TodoDataType[];
  input: string;
}) => {
  const router = useRouter();
  return (
    <>
      <Paper>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            py: 2,
            mb: 1,
          }}
        >
          <Button onClick={() => router.push("/")}>X</Button>
          <Typography component="span" variant="h6" color="blue">
            {input}
          </Typography>
          <Typography variant="h6">에 대한 검색 결과</Typography>
        </Box>
      </Paper>
      {searchTodos.length >= 1 ? (
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
              {searchTodos.map((data) => (
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

export default SearchTodoList;
