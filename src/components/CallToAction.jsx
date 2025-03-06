import React from "react";
import {
  Box,
  Typography,
  Button,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import callToActionImg from "../assets/images/CallToAction.jpg";
const CallToActionContainer = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${callToActionImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
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
    height: 300,
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    alignItems: "center",
    textAlign: "center",
  },
}));

const CallToAction = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <CallToActionContainer>
      <Typography
        variant={isMobile ? "h3" : "h2"}
        component="h2"
        gutterBottom
        fontWeight={700}
      >
        Get in Touch
      </Typography>
      <Typography
        variant="body1"
        component="p"
        mb={2}
        textAlign={isMobile ? "center" : "left"}
      >
        We'd love to hear from you!
      </Typography>
      <Button variant="contained" color="primary" href="/contact">
        Contact Now
      </Button>
    </CallToActionContainer>
  );
};

export default CallToAction;
