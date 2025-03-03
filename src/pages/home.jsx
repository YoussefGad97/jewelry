import { Container } from '@mui/material';
import CarouselCard from '../components/CarouselCard';
import ShopSection from '../components/ShopSection';

export default function HomePage() {
  return (
    <div>
      <CarouselCard />
      
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <ShopSection />
      </Container>
    </div>
  );
}
