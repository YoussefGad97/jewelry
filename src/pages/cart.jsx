import { 
  Box,
  Typography,
  Button,
  Grid,
  Divider
} from '@mui/material';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function Cart() {
  const { cartItems } = useCart();

  return (
    <Box sx={{ maxWidth: 1440, mx: 'auto', p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Shopping Cart ({cartItems.length})
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item, index) => (
            <Box key={item.id + index} sx={{ mb: 3 }}>
              <ProductCard product={item} compact />
              {index < cartItems.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Order Summary
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Total Items: {cartItems.length}
            </Typography>
            <Button 
              fullWidth 
              variant="contained"
              sx={{ mt: 2 }}
            >
              Checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
