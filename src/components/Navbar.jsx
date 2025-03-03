import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Drawer, Typography, useMediaQuery, Box, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';

const MotionButton = motion(Button);

const navLinks = [
  { path: '/', name: 'Home' },
  { path: '/shop', name: 'Shop' },
  { path: '/cart', name: 'Cart' },
  { path: '/favorites', name: 'Favorites' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const { cartItems, favorites } = useCart();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const appBarStyles = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    color: 'text.primary',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  };

  const mobilePaperProps = {
    sx: {
      width: '75%',
      maxWidth: 300,
      backgroundColor: 'rgba(255,255,255,0.98)',
      backdropFilter: 'blur(12px)',
      '& .MuiButton-root': {
        justifyContent: 'flex-start',
        px: 3,
        py: 2,
        borderRadius: 0,
        '&:hover': { backgroundColor: 'rgba(64, 224, 208, 0.1)' }
      }
    }
  };

  const renderNavLinks = (isMobile = false) => (
    <>
      {navLinks.map((link) => (
        <Button
          key={link.path}
          component={Link}
          to={link.path}
          fullWidth={isMobile}
          color="inherit"
          onClick={handleDrawerToggle}
          sx={{
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          {link.name}
          {!isMobile && location.pathname === link.path && (
            <motion.div className="active-indicator" />
          )}
        </Button>
      ))}
    </>
  );

  return (
    <AppBar sx={appBarStyles}>
      <Toolbar sx={{ justifyContent: 'space-between', position: 'relative' }}>
        {/* Logo with motion */}
        <Typography
          component={motion.div}
          to="/"
          variant="h6"
          whileHover={{ scale: 1.05 }}
          sx={{ 
            mr: 2, 
            fontWeight: 700,
            color: 'primary.main',
            textDecoration: 'none'
          }}
        >
          JewelryStore
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' },
          gap: 2,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          {renderNavLinks()}
        </Box>

        {/* Mobile menu button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ 
            display: { md: 'none' }, // Only show on mobile
            color: 'text.primary'
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Desktop Auth + Cart */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <IconButton component={Link} to="/favorites">
            <FavoriteIcon />
            <Badge badgeContent={favorites.length} color="primary" />
          </IconButton>
          <IconButton component={Link} to="/cart">
            <ShoppingCartIcon />
            <Badge badgeContent={cartItems.length} color="primary" />
          </IconButton>
          <Button component={Link} to="/login">Login</Button>
          <Button 
            variant="contained" 
            component={Link} 
            to="/signup"
            sx={{ 
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': { backgroundColor: 'primary.dark' }
            }}
          >
            Sign Up
          </Button>
        </Box>

        {/* Mobile drawer - only renders on mobile */}
        {isMobile && (
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            PaperProps={{
              sx: {
                width: '75%',
                maxWidth: 300,
                backgroundColor: 'rgba(255,255,255,0.98)',
                backdropFilter: 'blur(12px)',
                '& .MuiButton-root': {
                  justifyContent: 'flex-start',
                  px: 3,
                  py: 2,
                  borderRadius: 0,
                  '&:hover': {
                    backgroundColor: 'rgba(64, 224, 208, 0.1)'
                  }
                }
              }
            }}
          >
            <Box sx={{ p: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end',
                mb: 2
              }}>
                <IconButton onClick={handleDrawerToggle}>
                  <CloseIcon sx={{ color: 'text.primary' }} />
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
                      color: location.pathname === link.path ? 'primary.main' : 'text.primary',
                      fontWeight: location.pathname === link.path ? 600 : 400
                    }}
                  >
                    {link.name}
                  </Button>
                ))}
                <Divider sx={{ my: 2 }} />
                <Button 
                  component={Link} 
                  to="/login" 
                  fullWidth
                  sx={{ color: 'primary.main' }}
                >
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  component={Link} 
                  to="/signup"
                  fullWidth
                  sx={{ 
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': { backgroundColor: 'primary.dark' }
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            </Box>
          </Drawer>
        )}
      </Toolbar>
    </AppBar>
  );
} 