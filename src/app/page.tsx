import { Navbar } from "../components/layout/navbar";
import { FeaturesSection } from "../components/layout/sections/features";
import { Footer } from "../components/layout/sections/footer";
import { HeroSection } from "../components/layout/sections/hero";
import { HowItWorks } from "../components/layout/sections/how";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col align-middle items-center justify-center w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl mx-auto">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <Footer />
      </div>
    </>
  );
}
