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
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import products from '../data/products';

const ITEMS_PER_PAGE = 12;
const categories = [...new Set(products.map(p => p.category))];
const priceRange = [0, Math.max(...products.map(p => p.price))];

export default function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const [availability, setAvailability] = useState(['inStock']);
  const [price, setPrice] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState([]);

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

  return (
    <Box sx={{ 
      maxWidth: 1440, 
      mx: 'auto',
      pt: { xs: 5, md: 8 },
      pb: { xs: 2, md: 3 },
      px: { xs: 2, md: 3 },
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'row'
    }}>
      {/* Filters Sidebar */}
      <Box sx={{ 
        width: { xs: '100%', md: 300 }, 
        mr: { md: 4 },
        mb: { xs: 4, md: 0 },
        pt: { md: 2 }
      }}>
        <Accordion defaultExpanded sx={{ 
          mb: 2,
          mt: { xs: 0, md: 0 }
        }}>
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

      {/* Products Grid */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h2" sx={{ 
          mb: 6,
          pt: { xs: 3, md: 2 },
          textAlign: 'center',
          fontWeight: 800,
          letterSpacing: '-1px',
          color: 'text.primary'
        }}>
          Full Collection
        </Typography>
        
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ 
          maxWidth: 1440,
          mx: 'auto',
          px: { xs: 1, sm: 2 }
        }}>
          {paginatedProducts.map((product) => (
            <Grid item key={product.id} xs={6} sm={4} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        <Pagination
          count={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          sx={{ mt: 4, mb: 2 }}
        />
      </Box>
    </Box>
  );
}

