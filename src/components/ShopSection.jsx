import { Grid, Typography, Box } from '@mui/material';
import ProductCard from './ProductCard';
import GoldPearlNecklace from '../assets/products/GoldPearlNecklace.jpg';
import DiamondRing from '../assets/products/DiamondRing.jpg';
import SilverInfinityBracelet from '../assets/products/SilverInfiniteBracelete.jpg';
import PlatinumWeddingBand from '../assets/products/PlatinumWeddingBand.jpg';

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
    <Box sx={{ mb: 8 }}>
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
    </Box>
  );
} 
