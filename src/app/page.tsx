import { CardIntroduce } from "@/components/card-introduce";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";
import { ParalaxImageGraduation } from "@/components/paralax-image-graduation";
import { TimelineSection } from "@/components/time-line";

export default function Home() {
  return (
    <div className="relative w-full">
      {/* <Header /> */}
      <Header />
      <Hero />
      <CardIntroduce />
      <TimelineSection />
      <ParalaxImageGraduation />
      <Footer />
    </div>
  );
}
