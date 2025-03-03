import { Box, Typography, Grid } from '@mui/material';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function Favorites() {
  const { favorites } = useCart();

  return (
    <Box sx={{ maxWidth: 1440, mx: 'auto', p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Favorite Items ({favorites.length})
      </Typography>
      
      <Grid container spacing={3}>
        {favorites.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}