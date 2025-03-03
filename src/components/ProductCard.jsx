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
      position: 'relative',
      borderRadius: '16px',
      overflow: 'visible',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
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
          height: 360,
          objectFit: 'cover',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      />

      {/* Product Details */}
      <Box sx={{ p: 3, pt: 2.5 }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600,
          mb: 1.5,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: 'text.primary'
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
            fontWeight: 700,
            color: 'primary.main',
            letterSpacing: '-0.5px'
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