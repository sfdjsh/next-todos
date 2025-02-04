import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1, m: 0, p: 0 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor:'#37474f', boxShadow: 1 }}
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
