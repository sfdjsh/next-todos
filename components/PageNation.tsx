"use client";
import { Box, Pagination } from "@mui/material";
import { useRouter } from "next/navigation";

const PageNation = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) => {
  const router = useRouter();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(`/todos?page=${value}`);
  };

  return (
    <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
      <Pagination
        count={totalPages}
        color="primary"
        size="large"
        page={currentPage}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default PageNation;
