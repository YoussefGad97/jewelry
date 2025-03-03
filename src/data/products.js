import DiamondRing from '../assets/products/DiamondRing.jpg';
import GoldPearlNecklace from '../assets/products/GoldPearlNecklace.jpg';
import SilverInfinityBracelet from '../assets/products/SilverInfiniteBracelete.jpg';
import PlatinumWeddingBand from '../assets/products/PlatinumWeddingBand.jpg';





const products = [
  {
    id: 1,
    name: 'Diamond Elegance Ring',
    price: 1499,
    image: DiamondRing,
    sizes: ['6', '7', '8', '9'],
    category: 'Rings',
  },
  {
    id: 2,
    name: 'Gold Pearl Necklace',
    price: 899,
    image: GoldPearlNecklace,
    sizes: ['16"', '18"', '20"'],
    category: 'Necklaces',
  },
  {
    id: 3,
    name: 'Silver Infinity Bracelet',
    price: 650,
    image: SilverInfinityBracelet,
    sizes: ['S', 'M', 'L'],
    category: 'Bracelets',
  },
  {
    id: 4,
    name: 'Platinum Wedding Band',
    price: 2200,
    image: PlatinumWeddingBand,
    sizes: ['5', '6', '7', '8'],
    category: 'Rings',
  },
  // Add more products as needed...
];

export default products; 