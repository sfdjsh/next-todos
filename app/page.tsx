import { AppBar, Box, Typography, Container } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ textAlign: "center", p: 5 }}>
          스코필의 Todo 리스트
        </Typography>
      </Box>
    </>
  );
}
