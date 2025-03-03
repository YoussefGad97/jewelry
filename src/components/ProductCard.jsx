import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardMedia, 
  Typography, 
  IconButton, 
  Box, 
  Chip 
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const MotionIconButton = motion(IconButton);

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');

  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 3
      }
    }}>
      {/* Favorite Button */}
      <IconButton
        aria-label={liked ? "Remove from favorites" : "Add to favorites"}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 2,
          backgroundColor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(4px)',
          borderRadius: '50%',
          p: 1.5,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,1)',
            transform: 'scale(1.1)'
          }
        }}
        onClick={() => setLiked(!liked)}
      >
        {liked ? (
          <FavoriteIcon sx={{ color: 'error.main', fontSize: 24 }} />
        ) : (
          <FavoriteBorderIcon sx={{ 
            color: 'text.secondary', 
            fontSize: 24,
            '&:hover': { color: 'error.main' }
          }} />
        )}
      </IconButton>

      {/* Product Image */}
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        sx={{ 
          height: { xs: 200, sm: 240, md: 280 },
          objectFit: 'cover',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      />

      {/* Product Details */}
      <Box sx={{ p: 3, pt: 2.5 }}>
        <Typography variant="h6" sx={{
          fontSize: { xs: '0.875rem', sm: '1rem' },
          fontWeight: 600,
          lineHeight: 1.2,
          mb: 1,
          px: 2,
          pt: 1.5
        }}>
          {product.name}
        </Typography>

        {/* Size Selector */}
        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          mb: 2.5,
          flexWrap: 'wrap'
        }}>
          {product.sizes.map((size) => (
            <Chip
              key={size}
              label={size}
              clickable
              variant={selectedSize === size ? 'filled' : 'outlined'}
              color={selectedSize === size ? 'primary' : 'default'}
              onClick={() => setSelectedSize(size)}
              sx={{
                minWidth: 40,
                height: 32,
                borderRadius: 1.5,
                border: '1px solid',
                borderColor: 'divider',
                '&.MuiChip-filled': {
                  borderColor: 'primary.main'
                }
              }}
            />
          ))}
        </Box>

        {/* Price and Add to Cart */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6" sx={{
            fontSize: { xs: '1rem', sm: '1.1rem' },
            fontWeight: 700,
            color: 'primary.main',
            px: 2,
            pb: 1.5
          }}>
            ${product.price.toLocaleString()}
          </Typography>
          
          <MotionIconButton
            aria-label="Add to cart"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: '12px',
              p: 1.5,
              '&:hover': { 
                backgroundColor: 'primary.dark',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }
            }}
            onClick={() => console.log('Add to cart:', product.id)}
          >
            <ShoppingBagOutlinedIcon sx={{ fontSize: 24 }} />
          </MotionIconButton>
        </Box>
      </Box>
    </Card>
  );
} 