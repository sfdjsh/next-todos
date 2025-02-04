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
  Button,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { fetchPeriodTodoApi } from "@/lid/todoApi";
import { TodoDataType } from "@/models/types";
import { TestDataType } from "@/models/types";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calender = () => {
  const today = new Date();
  const [date, setDate] = useState(today);

  const [todayTodo, setTodayTodo] = useState<TestDataType[]>([]);

  useEffect(() => {
    const handlePeriodTodo = async () => {
      const formatDate = dayjs(date).format("YYYY-MM-DD");
      const response = await fetchPeriodTodoApi({ date: formatDate });
      setTodayTodo(response.data);
    };
    handlePeriodTodo();
  }, [date]);


  const dateChangeHandler = (newDate: Value) => {
    if (newDate instanceof Date) {
      setDate(newDate);
    } else if (Array.isArray(newDate) && newDate[0] instanceof Date) {
      setDate(newDate[0]);
    }
  };

  console.log(todayTodo);
  return (
    <main>
      <Box display="flex" sx={{ pt: 5 }}>
        <Calendar
          value={date}
          onChange={dateChangeHandler}
          locale="ko"
          prev2Label={null}
          next2Label={null}
          formatDay={(locale, date) => dayjs(date).format('DD')}
        />
        <Box component={Paper} sx={{ width: "50%" }}>
          <Typography variant="h5" sx={{ p: 2, textAlign: "center" }}>
            일정 내용들
          </Typography>
          {todayTodo.map((data) => (
            <Box key={data.id}>
              <Card variant="outlined" sx={{ width: "90%", m: "auto", mb: 1 }}>
                <CardContent>
                  <Typography variant="h6">{data.title}</Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: 1 }}
                  >
                    <Button variant="contained">{data.isDone ? "완료" : "미완료"}</Button>
                    <Typography variant="body2">
                      {data.startAt} ~ {data.endAt}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </main>
  );
};

export default Calender;
