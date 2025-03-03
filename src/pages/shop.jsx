import { Grid, Box, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import products from '../data/products'; // This should now resolve correctly

export default function Shop() {
  return (
    <Box sx={{ 
      maxWidth: 1440, 
      mx: 'auto', 
      p: { xs: 2, md: 3 },
      minHeight: '100vh'
    }}>
      <Typography variant="h2" sx={{ 
        mb: 6, 
        textAlign: 'center',
        fontWeight: 800,
        letterSpacing: '-1px',
        color: 'text.primary'
      }}>
        Full Collection
      </Typography>
      
      <Grid container spacing={{ xs: 3, md: 4 }}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

