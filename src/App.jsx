import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomThemeProvider from './theme/ThemeProvider';
import Navbar from './components/Navbar';
import HomePage from '../src/pages/home';
import ShopPage from '../src/pages/shop';
import CartPage from '../src/pages/cart';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <CartProvider>
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
      </CartProvider>
    </UserProvider>
  );
}

export default App;
