import { Container } from '@mui/material';
import CarouselCard from '../components/CarouselCard';
import ShopSection from '../components/ShopSection';
import ScrollToTop from '../components/ScrollToTop';
import landing1 from '../assets/images/Landing.png';
import TestimonialsSection from '../components/TestimonialsSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';


export default function HomePage() {
  return (
    <div>
      <div className="landing-section" style={{ position: 'relative' }}>
        <img src={landing1} alt="Landing" style={{ width: '100%', height: 'auto', zIndex: 0 }} />
      </div>
      <CarouselCard />
      
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <ShopSection />
      </Container>
      <TestimonialsSection  />
      <CallToAction /> 
      <ScrollToTop />
      <Footer />
    </div>
  );
}
