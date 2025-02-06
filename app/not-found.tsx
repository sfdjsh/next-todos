import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box sx={{ textAlign: "center", pt: 10 }}>
      <Typography variant="h4">페이지를 찾을 수 없습니다 😢</Typography>
      <Typography sx={{ m: 2 }}>올바른 주소인지 확인해주세요.</Typography>
      <Link href="/todos?page=1">홈으로 돌아가기</Link>
    </Box>
  );
}
