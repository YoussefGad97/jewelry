import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
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
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle signup logic
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
          Create Account
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

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          sx={{ mb: 3 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.acceptTerms}
              onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              I agree to the Terms of Service and Privacy Policy
            </Typography>
          }
          sx={{ mb: errors.acceptTerms ? 1 : 3, width: '100%' }}
        />
        {errors.acceptTerms && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {errors.acceptTerms}
          </Typography>
        )}

        <MotionButton
          fullWidth
          variant="contained"
          type="submit"
          size="large"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: 2,
            fontSize: '1.1rem',
            textTransform: 'none'
          }}
        >
          Sign Up
        </MotionButton>

        <Typography variant="body1" sx={{ mt: 3, textAlign: 'center' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ 
            color: '#40E0D0',
            textDecoration: 'none',
            fontWeight: 500,
            '&:hover': { textDecoration: 'underline' }
          }}>
            Log In
          </Link>
        </Typography>
      </Box>
    </Container>
  );
} 