import { useState } from 'react';
import { Card, CardMedia, CardContent, Button, Typography, Chip, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, Box, IconButton, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../context/CartContext';
import StarIcon from '@mui/icons-material/Star';

const MotionCard = motion(Card);

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleFavorite, favorites } = useCart();
  const isFavorite = favorites.some(p => p.id === product.id);

  const sizes = [
    { label: '16" (40.6 cm)', value: '16' },       // Common necklace length
    { label: '18" (45.7 cm)', value: '18' },       // Most popular necklace size
    { label: '20" (50.8 cm)', value: '20' },       // Choker length
    { label: '7" (17.8 cm) Bracelet', value: '7' },// Standard bracelet size
    { label: 'Ring Size 5', value: '5' },
    { label: 'Ring Size 6', value: '6' },
    { label: 'Ring Size 7', value: '7' },
    { label: 'Ring Size 8', value: '8' },
    { label: 'Ring Size 9', value: '9' },
    { label: 'One Size Fits All', value: 'OS' },
  ];

  const handleAddToCart = () => {
    addToCart({
      ...product,
      size: selectedSize,
      quantity: quantity
    });
    setOpen(false);
  };

  return (
    <>
      <MotionCard
        whileHover={{ y: -5 }}
        sx={{
          position: 'relative',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s',
          '&:hover': {
            boxShadow: '0 6px 24px rgba(0,0,0,0.12)'
          }
        }}
      >
        {/* Favorite Button */}
        <IconButton
          onClick={() => toggleFavorite(product)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            color: isFavorite ? 'red' : 'grey.500', // Change color based on favorite status
          }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>

        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            height: 280,
            objectFit: 'cover',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px'
          }}
        />

        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ mb: 2 }}>
            <Chip
              label={product.category}
              size="small"
              sx={{
                mb: 1,
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                fontWeight: 600
              }}
            />
            <Typography
              variant="h6"
              fontWeight="700"
              sx={{
                mb: 0.5,
                lineHeight: 1.2,
                color: 'text.primary'
              }}
            >
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <StarIcon fontSize="small" sx={{ color: 'warning.main' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {product.rating} ({product.reviews} reviews)
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 2,
              minHeight: '40px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {product.description}
          </Typography>

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            padding: 1,
            backgroundColor: 'action.hover',
            borderRadius: '12px'
          }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Total Price:
            </Typography>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
              ${product.price}
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
            onClick={() => setOpen(true)}
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              py: 1,
              fontWeight: 600,
              backgroundColor: 'primary.main',
              color: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              },
              '&:active': {
                transform: 'translateY(0)'
              }
            }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </MotionCard>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            width: '400px',
            maxWidth: '90vw',
            p: 2
          }
        }}
      >
        <DialogTitle sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          Select Options
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Size/Length</InputLabel>
            <Select
              value={selectedSize}
              label="Select Size/Length"
              onChange={(e) => setSelectedSize(e.target.value)}
              sx={{ borderRadius: '12px' }}
            >
              {sizes.map((size) => (
                <MenuItem key={size.value} value={size.value}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span>{size.label}</span>
                    {!isNaN(size.value) && size.value !== 'OS' && (
                      <Chip
                        label={`US ${size.value}`}
                        size="small"
                        sx={{ ml: 1, bgcolor: 'primary.light' }}
                      />
                    )}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Typography variant="subtitle1">Quantity:</Typography>
            <Button
              variant="outlined"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              sx={{ minWidth: '40px' }}
            >
              -
            </Button>
            <Typography variant="h6">{quantity}</Typography>
            <Button
              variant="outlined"
              onClick={() => setQuantity(quantity + 1)}
              sx={{ minWidth: '40px' }}
            >
              +
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleAddToCart}
            disabled={!selectedSize}
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              py: 1.5,
              fontWeight: 600,
              fontSize: '1rem',
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              },
              '&.Mui-disabled': {
                backgroundColor: 'primary.main',
                opacity: 0.7,
                color: 'white'
              }
            }}
          >
            Add {quantity} to Cart - ${(product.price * quantity).toFixed(2)}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
