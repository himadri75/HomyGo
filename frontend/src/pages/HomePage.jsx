import HeroSection from "../components/HeroSection"
import Destinations from "../components/Destinations"
import Testimonials from "../components/Testimonials"
import Features from "../components/Features"

const HomePage = () => {
  return (
    <div className="homygo-home overflow-hidden">
      <HeroSection />
      <Features />
      <Destinations />
      <Testimonials />
    </div>
  )
}

export default HomePage;
