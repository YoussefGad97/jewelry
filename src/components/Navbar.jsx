import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Drawer, Typography, useMediaQuery, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

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
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        color: 'text.primary',
        '& .MuiButton-root': {
          color: 'text.primary',
          '&:hover': {
            backgroundColor: 'rgba(64, 224, 208, 0.1)'
          }
        }
      }}
    >
      <Toolbar sx={{ 
        justifyContent: 'space-between',
        position: 'relative' 
      }}>
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/"
          sx={{ 
            textDecoration: 'none', 
            color: 'primary.main',
            fontWeight: 700,
            position: 'absolute',
            left: 16,
            '&:hover': {
              color: 'primary.dark'
            }
          }}
        >
          JewelryStore
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, ml: 'auto' }}
            >
              <MenuIcon />
            </IconButton>
            {mobileNav}
          </>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            width: '100%' 
          }}>
            <AnimatePresence mode="wait">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <MotionButton
                    key={link.path}
                    component={Link}
                    to={link.path}
                    variant="text"
                    sx={{
                      borderRadius: '8px',
                      px: 3,
                      color: location.pathname === link.path ? 'primary.main' : 'text.secondary',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.03)'
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
            </AnimatePresence>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
} 