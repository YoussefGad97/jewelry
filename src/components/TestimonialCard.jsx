import React from 'react';
import { Card, CardContent, CardMedia, Typography, styled, Rating } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
      margin: theme.spacing(2),
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  borderRadius: 10,
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
  },
}));

const TestimonialCard = ({ name, review, rating, image }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledCard>
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{ height: 200, objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
      />
      <CardContent sx={{ p: 2 }}>
      <Typography variant="h6" component="div" gutterBottom>
        {name}
      </Typography>
                <Rating name="read-only" value={rating} readOnly precision={0.5} size="small"/>
      <Typography variant="body2" color="textSecondary">
        {review}
      </Typography>
    </CardContent>
    </StyledCard>
);
};

export default TestimonialCard; 