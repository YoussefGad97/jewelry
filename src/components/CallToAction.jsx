import React from "react";
import { Box, Typography, Button, styled } from "@mui/material";
import callToActionImg from "../assets/images/CallToAction.jpg";
import { p } from "framer-motion/client";

const CallToActionContainer = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${callToActionImg})`,
  backgroundSize: "cover",
  backgroundPosition: "50% -50%",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  height: 450,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  color: "white",
  padding: theme.spacing(4),
  paddingLeft: theme.spacing(8),
  [theme.breakpoints.down("sm")]: {
    height: 200,
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
  },
}));

const CallToAction = () => {
  return (
    <CallToActionContainer>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        fontWeight={700}
        fontSize={49}
      >
        Get in Touch
      </Typography>
      <Typography variant="body1" component="p" mb={2}>
        We'd love to hear from you!
      </Typography>
      <Button variant="contained" color="primary" href="/contact">
        Contact Now
      </Button>
    </CallToActionContainer>
  );
};

export default CallToAction;
