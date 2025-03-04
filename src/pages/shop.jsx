import { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Slider,
  TextField,
  Drawer,
  IconButton,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import products from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollToTop from '../components/ScrollToTop';

const ITEMS_PER_PAGE = 12;
const categories = [...new Set(products.map(p => p.category))];
const priceRange = [0, Math.max(...products.map(p => p.price))];

export default function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const [availability, setAvailability] = useState(['inStock']);
  const [price, setPrice] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer

  const handleAvailabilityChange = (type) => (e) => {
    setAvailability(
      e.target.checked
        ? [...availability, type]
        : availability.filter(t => t !== type)
    );
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const handleCategoryChange = (category) => (e) => {
    setSelectedCategories(
      e.target.checked
        ? [...selectedCategories, category]
        : selectedCategories.filter(c => c !== category)
    );
  };

  const filteredProducts = products.filter(product => {
    const stockFilter = availability.length === 0 ||
      (availability.includes('inStock') && product.stock > 0) ||
      (availability.includes('outOfStock') && product.stock <= 0);

    const priceFilter = product.price >= price[0] && product.price <= price[1];
    const categoryFilter = selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    return stockFilter && priceFilter && categoryFilter;
  });

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    console.log('Products:', products);
    console.log('Filtered Products:', filteredProducts);
  }, [filteredProducts]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box sx={{
      maxWidth: 1440,
      mx: 'auto',
      pt: { xs: 2, md: 8 }, // Reduced top padding on small screens
      pb: { xs: 2, md: 3 },
      px: { xs: 1, md: 3 }, // Reduced horizontal padding on small screens
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'row'
    }}>

      {/* Filters Button (Mobile) */}
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{ display: { md: 'none' }, mb: 2 }} // Only visible on small screens
      >
        <FilterListIcon />
      </IconButton>

      {/* Filters Sidebar (Desktop) */}
      <Box sx={{
        width: { xs: '100%', md: 300 },
        mr: { md: 4 },
        mb: { xs: 4, md: 0 },
        pt: { md: 2 },
        mt: { xs: -3, md: 0 },
        display: { xs: 'none', md: 'block' } // Hide on small screens
      }}>
        {/* Filters Content (same as before) */}
        <Accordion defaultExpanded sx={{ mb: 2, mt: { xs: 0, md: 0 } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={600}>Availability</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel
              control={
                <Checkbox
                  checked={availability.includes('inStock')}
                  onChange={handleAvailabilityChange('inStock')}
                />
              }
              label="In Stock"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={availability.includes('outOfStock')}
                  onChange={handleAvailabilityChange('outOfStock')}
                />
              }
              label="Out of Stock"
            />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={600}>Price Range</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Slider
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={priceRange[1]}
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Min"
                type="number"
                value={price[0]}
                onChange={(e) => setPrice([e.target.value, price[1]])}
                sx={{ width: 100 }}
              />
              <TextField
                label="Max"
                type="number"
                value={price[1]}
                onChange={(e) => setPrice([price[0], e.target.value])}
                sx={{ width: 100 }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={600}>Product Type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {categories.map(category => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={handleCategoryChange(category)}
                  />
                }
                label={category}
                sx={{ display: 'block' }}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Filters Drawer (Mobile) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250, // Adjust drawer width as needed
            pt: 2,
            px: 2
          }
        }}
      >
        {/* Filters Content (same as above) */}
        <Accordion defaultExpanded sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={600}>Availability</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel
              control={
                <Checkbox
                  checked={availability.includes('inStock')}
                  onChange={handleAvailabilityChange('inStock')}
                />
              }
              label="In Stock"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={availability.includes('outOfStock')}
                  onChange={handleAvailabilityChange('outOfStock')}
                />
              }
              label="Out of Stock"
            />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={600}>Price Range</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Slider
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={priceRange[1]}
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Min"
                type="number"
                value={price[0]}
                onChange={(e) => setPrice([e.target.value, price[1]])}
                sx={{ width: 100 }}
              />
              <TextField
                label="Max"
                type="number"
                value={price[1]}
                onChange={(e) => setPrice([price[0], e.target.value])}
                sx={{ width: 100 }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={600}>Product Type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {categories.map(category => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={handleCategoryChange(category)}
                  />
                }
                label={category}
                sx={{ display: 'block' }}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      </Drawer>

      {/* Products Grid */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h4"
          sx={{
            mb: { xs: 2, md: 4 },
            pt: { xs: 1, md: 2 },
            textAlign: 'center',
            fontWeight: 700, // Added font weight
            letterSpacing: '-1px',
            color: 'text.primary',
            fontFamily: '"Playfair Display", serif', // Added font family
          }}
        >
          Full Collection
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }} sx={{
          maxWidth: 1440,
          mx: 'auto',
          px: { xs: 1, sm: 2 },
          '& .MuiGrid-item': {
            display: 'flex'
          }
        }}>
          <AnimatePresence initial={false} mode='popLayout'>
            {paginatedProducts.map((product) => (
              <Grid
                item
                key={product.id}
                xs={12} // Full width on extra-small screens
                sm={6}  // Half width on small screens and up
                md={4}  // One-third width on medium screens and up
                lg={3}  // One-fourth width on large screens and up
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <ProductCard
                  product={product}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                />
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

        <Pagination
          count={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'center' }} // Centered pagination
        />
      </Box>
      <ScrollToTop />
    </Box>
  );
}
