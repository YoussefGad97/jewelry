import { useState } from 'react';
import { 
  Box, Button, Container, Typography, Dialog, DialogActions, 
  DialogContent, DialogContentText, DialogTitle, IconButton,
  List, ListItem, ListItemText, Divider, Chip, Badge
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleClearCart = () => {
    clearCart();
    setOpenConfirm(false);
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: '80vh' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Your Shopping Cart
          <Badge 
            badgeContent={cartItems.length} 
            color="primary" 
            sx={{ ml: 2, '& .MuiBadge-badge': { top: 12 } }}
          />
        </Typography>
        
        {cartItems.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setOpenConfirm(true)}
            sx={{ borderRadius: '20px' }}
          >
            Clear Cart
          </Button>
        )}
      </Box>

      {/* Cart Items List */}
      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Your cart is empty
          </Typography>
        </Box>
      ) : (
        <>
          <List sx={{ mb: 4 }}>
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`}>
                <ListItem 
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      onClick={() => removeFromCart(item.id, item.size)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h6">{item.name}</Typography>
                        {item.size && (
                          <Chip 
                            label={`Size: ${item.size}`} 
                            variant="outlined" 
                            size="small"
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
                        <Typography variant="body2">
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography variant="body2">
                          Price: ${item.price.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>

          {/* Cart Summary */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Box sx={{ width: 300, p: 3, border: '1px solid', borderColor: 'divider', borderRadius: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Subtotal:</Typography>
                <Typography>${totalAmount.toFixed(2)}</Typography>
              </Box>
              <Button 
                fullWidth 
                variant="contained" 
                sx={{ 
                  mt: 2,
                  borderRadius: '20px',
                  py: 1.5,
                  backgroundColor: 'primary.main',
                  '&:hover': { backgroundColor: 'primary.dark' }
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Box>
        </>
      )}

      {/* Clear Cart Confirmation Dialog */}
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        PaperProps={{ sx: { borderRadius: '16px' } }}
      >
        <DialogTitle>Clear Cart Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove all items from your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenConfirm(false)}
            sx={{ borderRadius: '20px' }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleClearCart}
            sx={{ borderRadius: '20px' }}
          >
            Clear Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 