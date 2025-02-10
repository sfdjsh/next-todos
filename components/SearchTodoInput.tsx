"use client";
import { useEffect, useState } from "react";
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
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter, useSearchParams } from "next/navigation";

const SearchTodoInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [field, setField] = useState(searchParams.get("field") || "");
  const [searchInput, setSearchInput] = useState(searchParams.get("input") || "");

  useEffect(() => {
    setField(searchParams.get("field") || "")
    setSearchInput(searchParams.get("input") || "")
  }, [searchParams])

  const changeField = (event: SelectChangeEvent<string>) => {
    setField(event.target.value);
  };

  const searchedRoutePush = () => {
    router.push(`/todos/search?field=${field}&input=${searchInput}`);
  };

  return (
    <>
      <Grid container spacing={1} sx={{ mb: 1 }}>
        <Grid item xs={3} sm={2}>
          <FormControl fullWidth>
            <InputLabel>종류</InputLabel>
            <Select
              value={field}
              label="field"
              onChange={(e) => changeField(e)}
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
                        if (field && searchInput) searchedRoutePush();
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

export default SearchTodoInput;
