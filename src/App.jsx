import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomThemeProvider from './theme/ThemeProvider';
import Navbar from './components/Navbar';
import HomePage from '../src/pages/home';
import ShopPage from '../src/pages/shop';
import CartPage from '../src/pages/cart';
import Favorites from './pages/favorites';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import createTheme

// Create a theme instance.
const theme = createTheme({
  typography: {
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
  },
});

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <ThemeProvider theme={theme}> {/* Use ThemeProvider from @mui/material/styles */}
          <CustomThemeProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Router>
          </CustomThemeProvider>
        </ThemeProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
