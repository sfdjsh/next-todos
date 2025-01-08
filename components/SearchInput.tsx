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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid2";

const SearchInput = () => {
  const [field, setField] = useState("");
  const [searchInput, setSearchInput] = useState("")

  const handleChange = (event: SelectChangeEvent<string>) => {
    setField(event.target.value);
  };


  return (
    <Grid container spacing={1} sx={{ mb: 1 }}>
      <Grid size={2}>
        <FormControl fullWidth>
          <InputLabel>분류</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={field}
            label="field"
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value='title'>제목</MenuItem>
            <MenuItem value='test'>기간</MenuItem>
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
                  <IconButton onClick={() => {
                    console.log('클릭!')
                  }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SearchInput;
