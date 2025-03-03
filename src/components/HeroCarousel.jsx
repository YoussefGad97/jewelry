import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, useTheme, IconButton } from '@mui/material';
import hero1 from '../assets/images/hero1.jpg';
import hero2 from '../assets/images/hero2.avif';
import hero3 from '../assets/images/hero3.jpg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const images = [
  {
    url: hero1,
    title: 'Luxury Collections',
    subtitle: 'Discover Our Premium Selection'
  },
  {
    url: hero2,
    title: 'Handcrafted Elegance',
    subtitle: 'Artisan Jewelry Pieces'
  },
  {
    url: hero3,
    title: 'Timeless Accessories',
    subtitle: 'Elevate Your Style'
  }
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ position: 'relative', height: '100vh', width: '100%' }}>
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        >
          <Box
            sx={{
              position: 'relative',
              height: '100vh',
              width: '100%',
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${images[activeIndex].url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: 'white'
            }}
          >
            <Box sx={{ zIndex: 1 }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  [theme.breakpoints.down('md')]: {
                    fontSize: '2.5rem'
                  }
                }}
              >
                {images[activeIndex].title}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>
                {images[activeIndex].subtitle}
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 2
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            component="button"
            onClick={() => setActiveIndex(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              border: 'none',
              backgroundColor: activeIndex === index ? 'primary.main' : 'rgba(239, 198, 141, 0.5)',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          />
        ))}
      </Box>

      <IconButton
        onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '1rem',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255,255,255,0.5)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.75)',
          },
        }}
      >
        <ArrowBackIosIcon fontSize="large" />
      </IconButton>

      <IconButton
        onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '1rem',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255,255,255,0.5)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.75)',
          },
        }}
      >
        <ArrowForwardIosIcon fontSize="large" />
      </IconButton>
    </Box>
  );
} 