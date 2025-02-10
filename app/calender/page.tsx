"use client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./style.css";
import {
  Box,
  Paper,
  Typography,
  CardContent,
  Card,
  CardActions,
  Tooltip,
} from "@mui/material";
import dayjs from "dayjs";
import { fetchTodayTodoApi } from "@/lib/todoApi";
import { CalendarTodoType } from "@/models/types";
import IsDoneButton from "@/components/IsDoneButton";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calender = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [todayTodo, setTodayTodo] = useState<CalendarTodoType[]>([]);

  useEffect(() => {
    const handleTodayTodo = async () => {
      const formatDate = dayjs(date).format("YYYY-MM-DD");
      const response = await fetchTodayTodoApi(formatDate);
      setTodayTodo(response.data);
    };
    handleTodayTodo();
  }, [date]);

  const dateChangeHandler = (newDate: Value) => {
    if (newDate instanceof Date) {
      setDate(newDate);
    } else if (Array.isArray(newDate) && newDate[0] instanceof Date) {
      setDate(newDate[0]);
    }
  };

  return (
    <Box display="flex" sx={{ pt: 5 }}>
      <Calendar
        value={date}
        onChange={dateChangeHandler}
        locale="ko"
        prev2Label={null}
        next2Label={null}
        formatDay={(locale, date) => dayjs(date).format("DD")}
      />
      <Box
        component={Paper}
        sx={{
          ml: 1,
          width: "50%",
          maxHeight: "615px",
          overflowY: "auto",
          borderRadius: "16px",
          border: "5px solid #a0a096",
        }}
      >
        <Typography variant="h5" sx={{ p: 2, textAlign: "center" }}>
          일정 내용들
        </Typography>
        {todayTodo.map((data) => (
          <Box key={data.id}>
            <Card
              variant="outlined"
              sx={{ width: "90%", maxWidth: "400px", m: "auto", mb: 1 }}
            >
              <CardContent>
                <Box
                  sx={(theme) => ({
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    [theme.breakpoints.down("md")]: {
                      display: "block",
                    },
                  })}
                >
                  <Tooltip title={data.title} arrow>
                    <Typography
                      variant="body1"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "70%",
                        fontWeight: "bold",
                        cursor: "default",
                      }}
                    >
                      {data.title}
                    </Typography>
                  </Tooltip>
                  <IsDoneButton
                    id={data.id}
                    isDone={data.isDone}
                    type="calendar"
                  />
                </Box>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", textAlign: "center" }}
                >
                  {data.startAt} ~ {data.endAt}
                </Typography>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Calender;
