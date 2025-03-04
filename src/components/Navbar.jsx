import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  Typography,
  useMediaQuery,
  Box,
  Badge,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { useTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const navLinks = [
  { path: "/", name: "Home" },
  { path: "/shop", name: "Shop" },
  { path: "/cart", name: "Cart" },
  { path: "/favorites", name: "Favorites" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { cartItems, favorites } = useCart();
  const { user, logout } = useUser();
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setAnchorEl(null);
    setMobileOpen(false);
  }, [location.pathname]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  // Modern glass morphism effect
  const appBarStyles = {
    backgroundColor: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(231, 231, 231, 0.7)",
    color: "text.primary",
    boxShadow: "none",
    position: "sticky",
    py: 1,
  };

  const NavButton = ({ to, children, isMobile = false }) => {
    const isActive = location.pathname === to;

    return (
      <Button
        component={Link}
        to={to}
        fullWidth={isMobile}
        color="inherit"
        sx={{
          px: 2,
          py: 1,
          fontSize: "0.95rem",
          fontWeight: isActive ? 600 : 400,
          position: "relative",
          color: isActive ? "primary.main" : "text.primary",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "transparent",
            color: "primary.main",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            width: isActive ? "60%" : "0%",
            height: "3px",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "primary.main",
            transition: "width 0.3s ease",
            borderRadius: "4px",
          },
          "&:hover::after": {
            width: "60%",
          },
        }}
      >
        {children}
      </Button>
    );
  };

  const mobilePaperProps = {
    sx: {
      width: "75%",
      maxWidth: 300,
      backgroundColor: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(12px)",
      "& .MuiButton-root": {
        justifyContent: "flex-start",
        px: 3,
        py: 2,
        borderRadius: 0,
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.03)",
          transform: "translateX(5px)",
        },
      },
    },
  };

  const renderNavLinks = (isMobile = false) => (
    <>
      {navLinks.map((link) => (
        <NavButton key={link.path} to={link.path} isMobile={isMobile}>
          {link.name}
        </NavButton>
      ))}
    </>
  );

  // Icon button styling
  const iconButtonStyle = {
    color: "text.primary",
    borderRadius: "12px",
    p: 1,
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      transform: "translateY(-2px)",
    },
  };

  return (
    <AppBar sx={appBarStyles} elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between", position: "relative" }}>
        {/* Logo with motion */}
        <Typography
          component={motion.div}
          variant="h5"
          whileHover={{ scale: 1.05 }}
          sx={{
            mr: 2,
            fontWeight: 700,
            letterSpacing: "-0.5px",
            background: "linear-gradient(to right, #3a7bd5, #00d2ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none",
          }}
        >
          JewelryStore
        </Typography>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {renderNavLinks()}
        </Box>

        {/* Mobile menu button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{
            display: { md: "none" },
            ...iconButtonStyle,
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Desktop Auth + Cart */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
            alignItems: "center",
          }}
        >
          <IconButton component={Link} to="/favorites" sx={iconButtonStyle}>
            <Badge
              badgeContent={favorites.length}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.7rem",
                  minWidth: "18px",
                  height: "18px",
                  padding: "0 4px",
                },
              }}
            >
              <FavoriteIcon sx={{ fontSize: "1.3rem" }} />
            </Badge>
          </IconButton>

          <IconButton component={Link} to="/cart" sx={iconButtonStyle}>
            <Badge
              badgeContent={cartItems.length}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.7rem",
                  minWidth: "18px",
                  height: "18px",
                  padding: "0 4px",
                },
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: "1.3rem" }} />
            </Badge>
          </IconButton>

          {user.loggedIn ? (
            <>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="profile-menu"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  sx={{
                    ...iconButtonStyle,
                    ml: 1,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      background: "linear-gradient(45deg, #3a7bd5, #00d2ff)",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                    {user.initials}
                  </Avatar>
                </IconButton>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      minWidth: 180,
                      borderRadius: "12px",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                      "& .MuiMenuItem-root": {
                        px: 2,
                        py: 1.5,
                        fontSize: "0.95rem",
                        transition: "background-color 0.2s ease",
                        borderRadius: "8px",
                        mx: 0.5,
                        my: 0.5,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/profile'); }}>Profile</MenuItem>
                  <MenuItem onClick={logout} sx={{ color: "error.main" }}>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                sx={{
                  borderRadius: "8px",
                  px: 3,
                  fontSize: "0.9rem",
                  borderColor: "rgba(0,0,0,0.12)",
                  color: "text.primary",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "transparent",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/signup"
                variant="contained"
                sx={{
                  borderRadius: "8px",
                  px: 3,
                  fontSize: "0.9rem",
                  backgroundColor: theme.palette.primary.main,
                  boxShadow: "0 4px 12px rgba(58, 123, 213, 0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 16px rgba(58, 123, 213, 0.5)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>

        {/* Mobile drawer */}
        {isMobile && (
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            PaperProps={mobilePaperProps}
          >
            <Box sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 4,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: "-0.5px",
                    background: "linear-gradient(to right, #3a7bd5, #00d2ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  JewelryStore
                </Typography>
                <IconButton onClick={handleDrawerToggle} sx={iconButtonStyle}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Stack spacing={1}>
                {navLinks.map((link) => (
                  <Button
                    key={link.path}
                    component={Link}
                    to={link.path}
                    fullWidth
                    onClick={handleDrawerToggle}
                    sx={{
                      py: 1.5,
                      justifyContent: "flex-start",
                      color:
                        location.pathname === link.path
                          ? "primary.main"
                          : "text.primary",
                      fontWeight: location.pathname === link.path ? 600 : 400,
                      borderLeft:
                        location.pathname === link.path
                          ? "3px solid"
                          : "3px solid transparent",
                      borderColor:
                        location.pathname === link.path
                          ? "primary.main"
                          : "transparent",
                      borderRadius: "0 8px 8px 0",
                      pl: 2,
                    }}
                  >
                    {link.name}
                  </Button>
                ))}
                <Divider sx={{ my: 2 }} />
                {user.loggedIn ? (
                  <Box sx={{ px: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          background:
                            "linear-gradient(45deg, #3a7bd5, #00d2ff)",
                          mr: 2,
                        }}
                      >
                        {user.initials}
                      </Avatar>
                      <Typography variant="body1" fontWeight={500}>
                        {user.name}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        mt: 2,
                        borderRadius: "8px",
                        borderColor: "rgba(0,0,0,0.12)",
                        color: "error.main",
                        "&:hover": {
                          borderColor: "error.main",
                          backgroundColor: "error.light",
                          opacity: 0.1,
                        },
                      }}
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      px: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Button
                      component={RouterLink}
                      to="/login"
                      variant="outlined"
                      fullWidth
                      sx={{
                        borderRadius: "8px",
                        py: 1.2,
                        borderColor: "rgba(0,0,0,0.12)",
                        color: "text.primary",
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/signup"
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: "8px",
                        py: 1.2,
                        backgroundColor: theme.palette.primary.main,
                        boxShadow: "0 4px 12px rgba(58, 123, 213, 0.3)",
                      }}
                    >
                      Sign Up
                    </Button>
                  </Box>
                )}
              </Stack>
            </Box>
          </Drawer>
        )}
      </Toolbar>
    </AppBar>
  );
}
