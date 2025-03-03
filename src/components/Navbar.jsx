import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Drawer, Typography, useMediaQuery, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

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

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const MotionButton = motion(Button);

  const desktopNav = (
    <div className="flex items-center gap-4">
      {navLinks.map((link) => (
        <MotionButton
          key={link.path}
          component={Link}
          to={link.path}
          variant="text"
          color="inherit"
          sx={{
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {link.name}
          {location.pathname === link.path && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-main"
            />
          )}
        </MotionButton>
      ))}
    </div>
  );

  const mobileNav = (
    <Drawer
      PaperProps={{
        sx: {
          width: '60%',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          color: 'text.primary',
          '& .MuiButton-root': {
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.05)'
            }
          }
        }
      }}
    >
      <div className="p-4">
        <IconButton onClick={handleDrawerToggle} color="inherit">
          <CloseIcon />
        </IconButton>
        <div className="flex flex-col gap-4 mt-4">
          {navLinks.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              fullWidth
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
            </Button>
          ))}
        </div>
      </div>
    </Drawer>
  );

  return (
    <AppBar sx={{ 
      backgroundColor: 'rgba(255,255,255,0.95)',
      color: 'text.primary',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      '& .MuiButton-root': {
        color: 'text.primary',
        '&:hover': {
          backgroundColor: 'rgba(64, 224, 208, 0.1)'
        }
      }
    }}>
      <Toolbar sx={{ 
        justifyContent: 'space-between',
        position: 'relative'
      }}>
        {/* Logo */}
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{ 
            mr: 2, 
            fontWeight: 700,
            color: 'primary.main',
            textDecoration: 'none'
          }}
        >
          JewelryStore
        </Typography>

        {/* Centered Navigation Links */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' },
          gap: 2,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          <Button component={Link} to="/">Home</Button>
          <Button component={Link} to="/shop">Shop</Button>
          <Button>Collections</Button>
          <Button>About</Button>
        </Box>

        {/* Right-aligned Auth Buttons */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          gap: 2,
          alignItems: 'center'
        }}>
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

        {/* Mobile Menu Button */}
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ 
            display: { md: 'none' },
            color: 'text.primary'
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Drawer */}
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
              <Button component={Link} to="/" fullWidth>Home</Button>
              <Button component={Link} to="/shop" fullWidth>Shop</Button>
              <Button fullWidth>Collections</Button>
              <Button fullWidth>About</Button>
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
      </Toolbar>
    </AppBar>
  );
} 