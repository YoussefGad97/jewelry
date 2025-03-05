import React from 'react';
import { Box, Typography, Link, Stack, Container } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <Box component="footer" sx={{ backgroundColor: '#f0f0f0', py: 4 }}>
            <Container maxWidth="lg">
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={8}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="body2" color="textSecondary">
                            &copy; {new Date().getFullYear()} Your Jewelry Store. All rights reserved.
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Link href="/">Home</Link>
                            <Link href="/shop">Shop</Link>
                            <Link href="/cart">Cart</Link>
                            <Link href="/favorites">Favorites</Link>
                            <Link href="/login">Login</Link>
                            <Link href="/signup">Signup</Link>
                            <Link href="/profile">Profile</Link>
                        </Stack>
                    </Stack>
                    <Stack direction="column" spacing={2} alignItems="flex-start">
                        <Typography variant="h6" component="div" gutterBottom>Contact Us</Typography>
                        <Stack direction="row" spacing={2}>
                            <Stack spacing={0.5}>
                                <Typography variant="body2">Working Hours:</Typography>
                                <Typography variant="body2">Mon-Fri: 9am-5pm</Typography>
                                <Typography variant="body2">Sat: 10am-2pm</Typography>
                                <Typography variant="body2">Sun: Closed</Typography>
                            </Stack>
                            <Stack spacing={0.5} ml={4}>
                                <Typography variant="body2">Phone:</Typography>
                                <Typography variant="body2">
                                    <a href="tel:+15551234567">(555) 123-4567</a>
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                <FacebookIcon />
                            </Link>
                            <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                <InstagramIcon />
                            </Link>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;