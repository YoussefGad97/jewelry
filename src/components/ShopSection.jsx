import { Grid, Typography, Box } from '@mui/material';
import ProductCard from './ProductCard';
import GoldPearlNecklace from '../assets/products/GoldPearlNecklace.jpg';
import DiamondRing from '../assets/products/DiamondRing.jpg';
import SilverInfinityBracelet from '../assets/products/SilverInfiniteBracelete.jpg';
import PlatinumWeddingBand from '../assets/products/PlatinumWeddingBand.jpg';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const featuredProducts = [
  // Use a subset of your main products array
    { id: 1, name: 'Diamond Ring', price: 1499, image: DiamondRing, sizes: ['6', '7'] },
    { id: 2, name: 'Gold Necklace', price: 899, image: GoldPearlNecklace, sizes: ['16"'] },
    { id: 3, name: 'Silver Infinity Bracelet', price: 499, image: SilverInfinityBracelet, sizes: ['6', '7'] },
    { id: 4, name: 'Platinum Wedding Band', price: 1999, image: PlatinumWeddingBand, sizes: ['6', '7'] },
  // Add 3-5 featured products
];

export default function ShopSection() {
  return (
    <Box sx={{ mb: 8, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" sx={{ 
        mb: 6, 
        textAlign: 'center',
        fontWeight: 700 
      }}>
        Featured Collection
      </Typography>
      
      <Grid container spacing={4}>
        {featuredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Shop Now Button */}
      <Box sx={{ 
        textAlign: 'center', 
        mt: 8,
        '&:hover': { 
          transform: 'scale(1.02)',
          transition: 'transform 0.3s ease'
        }
      }}>
        <Button
          component={Link}
          to="/shop"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            fontSize: '1.1rem',
            px: 6,
            py: 1.5,
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: 'primary.dark',
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.3s ease',
            boxShadow: 3
          }}
        >
          Shop All Products
        </Button>
      </Box>
    </Box>
  );
} 
