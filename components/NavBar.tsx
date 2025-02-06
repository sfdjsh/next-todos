import Link from "next/link";
import { AppBar, Box, Toolbar, Button } from "@mui/material";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1, m: 0, p: 0 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#37474f", boxShadow: 1 }}
      >
        <Toolbar>
          <Box display="flex">
            <Button color="inherit">
              <Link
                href="/todos?page=1"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                테이블
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                href="/calender"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                캘린더
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
