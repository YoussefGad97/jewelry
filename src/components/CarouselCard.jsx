import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Card, CardMedia, useTheme, Grid } from '@mui/material';
import necklace from '../assets/images/hero1.jpg';
import ring from '../assets/images/hero2.avif';
import bracelet from '../assets/images/hero3.jpg';

const slides = [
  {
    image: necklace,
    title: 'Elegant Necklaces',
    text: 'Discover our curated collection of handcrafted necklaces',
  },
  {
    image: ring,
    title: 'Signature Rings',
    text: 'Find the perfect statement piece for any occasion',
  },
  {
    image: bracelet,
    title: 'Artisan Bracelets',
    text: 'Unique designs that complement your personal style',
  },
];

export default function CarouselCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const theme = useTheme();

  const navigate = (newDirection) => {
    setDirection(newDirection);
    setActiveIndex((prev) => 
      newDirection === 'next' 
        ? (prev + 1) % slides.length 
        : (prev - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => navigate('next'), 5000);
    return () => clearInterval(interval);
  }, []);

  const cardVariants = {
    enter: (direction) => ({
      x: direction === 'next' ? '100%' : '-100%',
      opacity: 0,
      rotateY: direction === 'next' ? 20 : -20,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    },
    exit: (direction) => ({
      x: direction === 'next' ? '-100%' : '100%',
      opacity: 0,
      rotateY: direction === 'next' ? -20 : 20,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }),
  };

  const textVariants = {
    enter: { opacity: 0, x: -20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <Box sx={{ 
      maxWidth: 1200, 
      margin: '4rem auto',
      padding: 2,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Grid container spacing={4} alignItems="center">
        {/* Text Content */}
        <Grid item xs={12} md={6}>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeIndex}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Typography variant="h3" gutterBottom sx={{ 
                fontWeight: 700,
                [theme.breakpoints.down('md')]: { fontSize: '2rem' }
              }}>
                {slides[activeIndex].title}
              </Typography>
              <Typography variant="h6" sx={{ 
                color: 'text.secondary',
                lineHeight: 1.6
              }}>
                {slides[activeIndex].text}
              </Typography>
            </motion.div>
          </AnimatePresence>
        </Grid>

        {/* Animated Card Container */}
        <Grid item xs={12} md={6} sx={{ 
          position: 'relative',
          overflow: 'hidden'
        }}>
          <AnimatePresence mode='wait' custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ 
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Card sx={{ 
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: 3,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)' }
              }}>
                <CardMedia
                  component="img"
                  image={slides[activeIndex].image}
                  sx={{ 
                    height: 400,
                    objectFit: 'cover',
                    width: '100%'
                  }}
                />
              </Card>
            </motion.div>
          </AnimatePresence>
        </Grid>
      </Grid>

      {/* Indicators Only */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 1, 
        mt: 4 
      }}>
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setActiveIndex(index)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: activeIndex === index ? 'primary.main' : 'grey.300',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </Box>
    </Box>
  );
} 