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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid2";
import { fetchSearchTodoApi, fetchTodoApi } from "@/lid/todoApi";
import { useRouter } from "next/navigation";
import { TodoDataType,SearchType } from "@/models/types";

type SetTodo = {
  setTodos: React.Dispatch<React.SetStateAction<TodoDataType[]>>;
}

const SearchInput = ({ setTodos }: SetTodo) => {
  const router = useRouter();

  const [field, setField] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchButtonFlag, setSearchButtonFlag] = useState(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setField(event.target.value);
  };

  const handleSearchTodo = async ({ field, searchInput }: SearchType) => {
    const response = await fetchSearchTodoApi({ field, searchInput });
    const result = response.data;
    setTodos(result);
  };

  const initFetchTodos = async () => {
    const response = await fetchTodoApi();
    const result = response.data;
    setTodos(result);
  };

  return (
    <>
      <Grid container spacing={1} sx={{ mb: 1 }}>
        <Grid size={2}>
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
              <MenuItem value="test">기간</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={10}>
          <Box>
            <TextField
              autoFocus
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        if (field && searchInput) {
                          handleSearchTodo({ field, searchInput });
                          setSearchButtonFlag(true);
                        } else {
                          alert("검색 종류와 검색어를 정확히 입력해주세요.");
                          setSearchButtonFlag(false);
                        }
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
      {searchButtonFlag && field && searchInput && (
        <Paper>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              py: 2,
              mb: 1,
            }}
          >
            <Button
              onClick={() => {
                setSearchButtonFlag(false);
                setSearchInput("");
                setField("");
                initFetchTodos();
              }}
            >
              X
            </Button>
            <Typography component="span" variant="h6" color="blue">
              {searchInput}
            </Typography>
            <Typography variant="h6">에 대한 검색 결과</Typography>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default SearchInput;
