import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomThemeProvider from './theme/ThemeProvider';
import Navbar from './components/Navbar';
import HomePage from '../src/pages/home';
import ShopPage from '../src/pages/shop';
import CartPage from '../src/pages/cart';
import FavoritesPage from '../src/pages/favorites';

function App() {
  return (
    <CustomThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Router>
    </CustomThemeProvider>
  );
}

export default App; 