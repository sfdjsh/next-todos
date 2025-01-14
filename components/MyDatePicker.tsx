"use client";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

export default function MyDatePicker({startValue, endValue, setStartValue, setEndValue}: any) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" alignItems="center">
        <DatePicker
          format="YYYY-MM-DD"
          label="시작일"
          value={startValue}
          onChange={(newValue) => setStartValue(newValue)}
        />
        <Typography sx={{ px: 1 }}> ~ </Typography>
        <DatePicker
          format="YYYY-MM-DD"
          label="종료일"
          value={endValue}
          onChange={(newValue) => setEndValue(newValue)}
        />
      </Box>
    </LocalizationProvider>
  );
}
