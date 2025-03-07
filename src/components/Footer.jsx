import React from "react";
import {
  Box,
  Typography,
  Link as MuiLink,
  Stack,
  Container,
  useTheme,
  useMediaQuery,
  styled,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const StyledLink = styled(MuiLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
  "&:hover": {
    textDecoration: "underline",
  },
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box component="footer" sx={{ backgroundColor: "#f0f0f0", py: 4 }}>
      <Container maxWidth="lg">
        <Stack direction="column" spacing={4}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
          >
            <Typography variant="body2" color="textSecondary">
              &copy; {new Date().getFullYear()} Your Jewelry Store. All rights
              reserved.
            </Typography>
            <Stack direction="row" spacing={2}>
              <MuiLink
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </MuiLink>
              <MuiLink
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </MuiLink>
            </Stack>
          </Stack>
          <Stack direction="column" spacing={2}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={2}
              flexWrap="wrap"
            >
              <StyledLink href="/">Home</StyledLink>
              <StyledLink href="/shop">Shop</StyledLink>
              <StyledLink href="/cart">Cart</StyledLink>
              <StyledLink href="/favorites">Favorites</StyledLink>
              <StyledLink href="/login">Login</StyledLink>
              <StyledLink href="/signup">Signup</StyledLink>
              <StyledLink href="/profile">Profile</StyledLink>
            </Stack>
          </Stack>
          <Stack direction="column" spacing={1}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              <a href="tel:+15551234567">(555) 123-4567</a>
            </Typography>
            <Typography variant="body2">
              Mon-Fri: 9am-5pm
              <br />
              Sat: 10am-2pm
              <br />
              Sun: Closed
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
