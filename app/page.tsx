import Header from '../components/sections/Header';
import MiniTestimonial from '../components/sections/MiniTestimonial';
import FinanceTicker from '../components/sections/FinanceTicker';
import Carousel from '../components/sections/Carousel';
import DashboardCard from '../components/sections/DashboardCard';
import SlidingTestimonials from '../components/sections/SlidingTestimonials';
import Footer from '../components/sections/Footer';

export default function Page() {
  return (
    <>
      <Header />
      <MiniTestimonial />
      <FinanceTicker />
      <Carousel />
      <DashboardCard />
      <SlidingTestimonials />
      <Footer />
    </>
  );
}
