import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Brightness2, Brightness7 } from "@mui/icons-material";
import Switch from "@mui/material/Switch";
import { Box } from "@mui/material";
import { useThemeToggle } from "../../ThemeToggleProvider"; // Import the custom hook

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreAnchorEl, setMoreAnchorEl] = useState(null); // For "More" dropdown
  const open = Boolean(anchorEl);
  const moreOpen = Boolean(moreAnchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const { darkMode, toggleDarkMode } = useThemeToggle(); // Access darkMode and toggle function

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Actors", path: "/actors" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming Movies", path: "/movies/upcoming" }, 
    { label: "Trending", path: "/movies/trending" },
  ];

  const moreOptions = [
    { label: "Latest", path: "/movies/latest" },
    { label: "Recommendations", path: "/movies/recommendations" },
    { label: "Top Rated", path: "/movies/top-rated" },
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreMenu = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#5151b4" }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            The Mark Ryan Movie Database!
          </Typography>
          <Box display="flex" alignItems="center" mr={2}>
            {/* Dark/Light Mode Toggle */}
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <Brightness2 /> : <Brightness7 />}
            </IconButton>
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              inputProps={{ "aria-label": "toggle dark/light mode" }}
            />
          </Box>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
                <MenuItem onClick={handleMoreMenu}>
                  More
                </MenuItem>
                <Menu
                  anchorEl={moreAnchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={moreOpen}
                  onClose={() => setMoreAnchorEl(null)}
                >
                  {moreOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))}
              <Button
                color="inherit"
                onClick={handleMoreMenu}
              >
                More
              </Button>
              <Menu
                anchorEl={moreAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={moreOpen}
                onClose={() => setMoreAnchorEl(null)}
              >
                {moreOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
