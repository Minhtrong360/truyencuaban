import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";

import Logo from "../components/Logo";

import { SelectAutoWidth } from "../components/form";

import { useNavigate } from "react-router-dom";
import { Avatar, Divider, Menu, Stack } from "@mui/material";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import YouTubeIcon from "@mui/icons-material/YouTube";
import StarIcon from "@mui/icons-material/Star";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SearchInput from "../components/SearchInput";

function MainHeader({ genreID, setGenreID, search, setSearch }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();

  // const Search = styled("div")(({ theme }) => ({
  //   position: "relative",
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   "&:hover": {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  //   marginLeft: 0,
  //   width: "100%",
  //   [theme.breakpoints.up("sm")]: {
  //     marginLeft: theme.spacing(1),
  //     width: "auto",
  //   },
  // }));

  // const SearchIconWrapper = styled("div")(({ theme }) => ({
  //   padding: theme.spacing(0, 2),
  //   height: "100%",
  //   position: "absolute",
  //   pointerEvents: "none",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // }));

  // const StyledInputBase = styled(InputBase)(({ theme }) => ({
  //   color: "inherit",
  //   "& .MuiInputBase-input": {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     // vertical padding + font size from searchIcon
  //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  //     transition: theme.transitions.create("width"),
  //     width: "100%",
  //     [theme.breakpoints.up("sm")]: {
  //       width: "12ch",
  //       "&:focus": {
  //         width: "20ch",
  //       },
  //     },
  //   },
  // }));

  let auth = useAuth();

  let location = useLocation();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    console.log(location);
  };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  const handleLogout = () => {
    handleMenuClose(); //menu close before signout so that login won't pop up.
    auth.logout();
    navigate("/");
  };
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {auth.user ? (
        <Box>
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle2" noWrap>
              {auth.user?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {auth.user?.email}
            </Typography>
          </Box>

          <Divider sx={{ borderStyle: "dashed" }} />

          <MenuItem
            onClick={handleMenuClose}
            to="/account"
            component={Link}
            sx={{ mx: 1 }}
          >
            Tài Khoản
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            to="/subscription"
            component={Link}
            sx={{ mx: 1 }}
          >
            Đăng ký
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            to="/story/create"
            component={Link}
            sx={{ mx: 1 }}
          >
            Tạo truyện mới
          </MenuItem>

          <Divider sx={{ borderStyle: "dashed" }} />

          <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
            Đăng xuất
          </MenuItem>
        </Box>
      ) : (
        <Button
          color="inherit"
          component={Link}
          to="/login"
          state={{ backgroundLocation: location, from: location }}
          onClick={handleMenuClose}
        >
          Đăng nhập
        </Button>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to="/discovery/1">
        <IconButton
          size="large"
          color="inherit"
          disableRipple={true}
          children={<YouTubeIcon />}
        />
        <p>Discovery</p>
      </MenuItem>

      <MenuItem component={Link} to="/favorite">
        <IconButton
          size="large"
          color="inherit"
          disableRipple={true}
          children={<StarIcon />}
        />

        <p>Favorite</p>
      </MenuItem>
      <MenuItem component={Link} to="/login">
        <IconButton
          size="large"
          //cool styling ui props
          aria-label="account of current user"
          aria-controls={menuId}
          disableRipple={true}
          aria-haspopup="true"
          color="inherit"
          children={<AccountCircle />}
        />

        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

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
              TruyenCuaBan.com
            </Typography>
          </IconButton>

          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{
              cursor: "pointer",
              marginLeft: 5,
              "&:hover": { color: "#ff8800" },
            }}
            onClick={() => navigate(`/stories/hot-stories`)}
          >
            Truyện hot
          </Typography>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{
              cursor: "pointer",
              marginLeft: 5,
              "&:hover": { color: "#ff8800" },
            }}
            onClick={() => navigate(`/stories/love-stories`)}
          >
            Truyện yêu thích
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <SelectAutoWidth />

          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput />
          </Stack>

          <Box sx={{ marginLeft: 5 }}>
            <Avatar
              onClick={handleProfileMenuOpen}
              src={auth?.user?.cover}
              alt={auth?.user?.username}
              sx={{ width: 52, height: 52 }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default MainHeader;
