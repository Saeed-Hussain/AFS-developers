import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Founders from "@/components/Founders";
import Courses from "@/components/Courses";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Founders />
        <Courses />
        <Process />
        <WhyUs />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
