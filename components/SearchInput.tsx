"use client";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  Box,
  SelectChangeEvent,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Paper,
  Grid
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { fetchSearchTodoApi, fetchTodoApi } from "@/lid/todoApi";
import { useRouter } from "next/navigation";
import { TodoDataType, SearchType } from "@/models/types";

type SetTodo = {
  setTodos: React.Dispatch<React.SetStateAction<TodoDataType[]>>;
};

const SearchInput = () => {
  const router = useRouter();

  const [field, setField] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setField(event.target.value);
  };

  const searchPush = () => {
    router.push(`/todos/search?field=${field}&input=${searchInput}`);
  };

  return (
    <>
      <Grid container spacing={1} sx={{ mb: 1 }}>
        <Grid item xs={3} sm={2}>
          <FormControl fullWidth>
            <InputLabel>종류</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={field}
              label="field"
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value="title">제목</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={9} sm={10}>
          <Box>
            <TextField
              autoFocus
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        if (field && searchInput) searchPush();
                        else alert("검색 종류와 검색어를 정확히 입력해주세요.");
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SearchInput;
