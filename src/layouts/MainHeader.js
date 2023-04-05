import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Logo from "../components/Logo";

import { SelectAutoWidth } from "../components/form";

import { useNavigate } from "react-router-dom";
import { Avatar, Divider, Menu, Stack } from "@mui/material";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SearchInput from "../components/SearchInput";
import { BASE_URL2 } from "../app/config";
import { useTheme } from "@emotion/react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function MainHeader() {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();

  let auth = useAuth();

  let location = useLocation();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose(); //menu close before signout so that login won't pop up.
    auth.logout();
    navigate("/");
  };

  const isMenuOpen = Boolean(anchorEl);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        theme.palette.setMode((prevMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    [theme.palette]
  );

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
          <Divider sx={{ borderStyle: "dashed" }} />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.default",
              color: "text.primary",
              borderRadius: 1,
              p: 1,
            }}
          >
            {theme.palette.mode.charAt(0).toUpperCase() +
              theme.palette.mode.slice(1)}{" "}
            mode
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Box>
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

  const menuItems = [
    {
      label: "Truyện hot",
      onClick: () => navigate(`/stories/hot-stories`),
    },
    {
      label: "Truyện yêu thích",
      onClick: () => navigate(`/stories/love-stories`),
    },
  ];
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
            sx={{ mr: 2, ml: 2, alignItems: "center" }}
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

          {menuItems.map((item) => (
            <Typography
              key={item.label}
              variant="h6"
              color="inherit"
              component="div"
              sx={{
                cursor: "pointer",
                marginLeft: 5,
                "&:hover": { color: "black" },
              }}
              onClick={item.onClick}
            >
              {item.label}
            </Typography>
          ))}

          <Box sx={{ flexGrow: 1 }} />
          <SelectAutoWidth />

          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput />
          </Stack>

          <Box sx={{ marginLeft: 5 }}>
            <Avatar
              onClick={handleProfileMenuOpen}
              src={`${BASE_URL2}${auth?.user?.cover}`}
              alt={auth?.user?.username}
              sx={{ width: 52, height: 52 }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </Box>
  );
}

export default MainHeader;
