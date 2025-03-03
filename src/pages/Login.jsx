import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle login logic
      navigate('/');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{
          p: 6,
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: 'background.paper'
        }}
      >
        <Typography variant="h3" sx={{ 
          mb: 4, 
          textAlign: 'center',
          fontWeight: 700,
          color: 'primary.main'
        }}>
          Welcome Back
        </Typography>

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          sx={{ mb: 3 }}
        />

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Link to="/forgot-password" style={{ 
            color: '#40E0D0',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}>
            Forgot Password?
          </Link>
        </Box>

        <MotionButton
          fullWidth
          variant="contained"
          type="submit"
          size="large"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontSize: '1.1rem',
            textTransform: 'none'
          }}
        >
          Log In
        </MotionButton>

        <Typography variant="body1" sx={{ mt: 3, textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ 
            color: '#40E0D0',
            textDecoration: 'none',
            fontWeight: 500,
            '&:hover': { textDecoration: 'underline' }
          }}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
} 