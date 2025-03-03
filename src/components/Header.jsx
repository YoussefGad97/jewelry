import { AppBar, Toolbar, IconButton, Typography, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Jewelry Store
        </Typography>
        {!isMobile && (
          <>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Shop</Button>
            <Button color="inherit">Cart</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
} 