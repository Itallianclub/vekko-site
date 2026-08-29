import { SiteFooter } from "../layout/site-footer/site-footer";
import { SiteHeader } from "../layout/site-header/site-header";
import { AppCta } from "./app-cta/app-cta";
import { Benefits } from "./benefits/benefits";
import { Faq } from "./faq/faq";
import { Hero } from "./hero/hero";
import { HomeAnimations } from "./home-animations";
import { HowItWorks } from "./how-it-works/how-it-works";
import { Network } from "./network/network";
import { PartnerPreview } from "./partner-preview/partner-preview";
import { Plans } from "./plans/plans";

export function HomeExperience() {
  return (
    <HomeAnimations>
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <Plans />
        <Network />
        <PartnerPreview />
        <Faq />
        <AppCta />
      </main>
      <SiteFooter />
    </HomeAnimations>
  );
}
