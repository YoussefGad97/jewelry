import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Container,
  useTheme,
  useMediaQuery,
  styled,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TestimonialCard from "./TestimonialCard";
import Customer1 from "../assets/images/Customer1.jpg";

const testimonials = [
  {
    name: "Jane Doe",
    review:
      "The jewelry is absolutely stunning! High quality and beautiful design.",
    rating: 5,
    image: Customer1,
  },
  {
    name: "John Smith",
    review:
      "Excellent customer service and fast shipping. I highly recommend this store!",
    rating: 4.5,
    image: Customer1,
  },
  {
    name: "Emily Brown",
    review: "I love my new earrings! They are even more beautiful in person.",
    rating: 5,
    image: Customer1,
  },
  {
    name: "David Lee",
    review:
      "The craftsmanship is exceptional.  A truly special piece of jewelry.",
    rating: 4,
    image: Customer1,
  },
  {
    name: "Sarah Jones",
    review:
      "Beautiful packaging and presentation. Made the gift even more special.",
    rating: 5,
    image: Customer1,
  },
  {
    name: "Michael Davis",
    review:
      "I was very pleased with the entire purchase experience. Highly recommended!",
    rating: 4.5,
    image: Customer1,
  },
];

const TestimonialsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalPages - 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const startIndex = currentIndex * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const displayedTestimonials = testimonials.slice(startIndex, endIndex);

  const StyledButton = styled("button")(({ theme }) => ({
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "default",
    },
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  }));

  return (
    <Container maxWidth="lg" sx={{ py: 8, position: "relative" }}>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        component="h2"
        align="center"
        gutterBottom
      >
        What Our Customers Are Saying
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", position: "relative" }}
      >
        <Grid
          container
          spacing={isMobile ? 2 : 4}
          justifyContent="space-between"
        >
          {displayedTestimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} position="relative">
              <TestimonialCard {...testimonial} />
              {index === 0 && (
                <StyledButton
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  sx={{ left: 0 }}
                >
                  <ArrowBackIosNewIcon />
                </StyledButton>
              )}
              {index === displayedTestimonials.length - 1 && (
                <StyledButton
                  onClick={handleNext}
                  disabled={currentIndex === totalPages - 1}
                  sx={{ right: -40 }}
                >
                  <ArrowForwardIosIcon />
                </StyledButton>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default TestimonialsSection;
