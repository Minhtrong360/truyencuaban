import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";
import Logo from "../components/Logo";

import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";

import { SelectAutoWidth } from "../components/form";

import { useNavigate } from "react-router-dom";

function MainHeader({ genreID, setGenreID, search, setSearch }) {
  const navigate = useNavigate();

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <Box sx={{ minWidth: 400 }}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ml: 2 }}
            onClick={() => navigate(`/`)}
          >
            <Logo />
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              sx={{ cursor: "pointer" }}
            >
              PhimVui.com
            </Typography>
          </IconButton>

          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/product/hot-move`)}
          >
            PHIM HOT
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/product/popular-move`)}
          >
            PHIM PHỔ BIẾN
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/product/good-move`)}
          >
            PHIM HAY
          </Typography>
          <SelectAutoWidth genreID={genreID} setGenreID={setGenreID} />
          <Search sx={{ left: 10 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              // onChange={
              //   ("keypress",
              //   function (e) {
              //     console.log("search OK", e);
              //     if (e.key === "Enter") {
              //       setSearch(e.target.value);
              //       e.preventDefault();
              //     }
              //   })
              // } CHƯA OK
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
