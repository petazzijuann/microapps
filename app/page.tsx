import FloatingCatalogButton from "@/components/FloatingCatalogButton";
import Hero from "@/components/sections/Hero";
import WhatIsMicroapp from "@/components/sections/WhatIsMicroapp";
import HowItWorks from "@/components/sections/HowItWorks";
import Capabilities from "@/components/sections/Capabilities";
import Pricing from "@/components/sections/Pricing";
import OwnProjects from "@/components/sections/OwnProjects";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIsMicroapp />
      <HowItWorks />
      <Capabilities />
      <Pricing />
      <OwnProjects />
      <FinalCta />
      <FloatingCatalogButton />
    </>
  );
}
