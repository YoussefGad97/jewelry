import { Container } from '@mui/material';
import CarouselCard from '../components/CarouselCard';
import ShopSection from '../components/ShopSection';
import ScrollToTop from '../components/ScrollToTop';
import landing1 from '../assets/images/Landing.jpg';
import TestimonialsSection from '../components/TestimonialsSection';

export default function HomePage() {
  return (
    <div>
      <div className="landing-section" style={{ position: 'relative' }}>
        <img src={landing1} alt="Landing" style={{ width: '100%', height: 'auto', zIndex: 0 }} />
        <h2 style={{ 
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center', 
          color: '#fff', 
          margin: '0', 
          fontSize: '2.5rem', 
          textShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', 
          fontWeight: 'bold', 
          letterSpacing: '2px', 
          zIndex: 1 
        }}>Welcome to Our Jewelry Store</h2>
      </div>
      <CarouselCard />
      
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <ShopSection />
      </Container>
      <TestimonialsSection  />
      <ScrollToTop />
    </div>
  );
}
