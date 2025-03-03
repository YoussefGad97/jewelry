import { Grid, Card, CardContent, Button, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ProductCard({ product }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'background.paper',
      }}>
        <CardContent sx={{ flexGrow: 1 }}>
          {/* Product Image */}
          <img 
            src={product.image} 
            alt={product.name}
            style={{ 
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '4px'
            }}
          />
          
          {/* Product Details */}
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </CardContent>

        {/* Action Buttons */}
        <Grid container spacing={1} sx={{ p: 2 }}>
          <Grid item xs={8}>
            <Button 
              fullWidth
              variant="contained" 
              color="secondary"
              sx={{ py: 1 }}
            >
              Add to Cart
            </Button>
          </Grid>
          <Grid item xs={4}>
            <IconButton 
              aria-label="favorite"
              sx={{ 
                width: '100%',
                color: 'error.main',
                '&.active': { color: 'primary.main' }
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
} 