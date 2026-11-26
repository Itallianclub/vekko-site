import { headers } from "next/headers";
import { detectPlatform } from "../../lib/platform";
import { Analytics } from "../analytics/analytics";
import { SiteFooter } from "../layout/site-footer/site-footer";
import { SiteHeader } from "../layout/site-header/site-header";
import { PlatformProvider } from "../store/platform-context";
import { Faq } from "./faq/faq";
import { FinalCta } from "./final-cta/final-cta";
import { Hero } from "./hero/hero";
import { DownloadBar } from "./download-bar/download-bar";
import { HomeMotion } from "./home-motion";
import { HowItWorks } from "./how-it-works/how-it-works";
import { PartnerStrip } from "./partner-strip/partner-strip";
import { Plans } from "./plans/plans";
import { Story } from "./story/story";
import { Wash } from "./wash/wash";

export async function HomeExperience() {
  const userAgent = (await headers()).get("user-agent");

  return (
    <PlatformProvider initial={detectPlatform(userAgent)}>
      <div className="home">
        <SiteHeader overHero />
        <main id="conteudo" tabIndex={-1}>
          <Hero />
          <Story />
          <Wash />
          <HowItWorks />
          <Plans />
          <Faq />
          <FinalCta />
          <PartnerStrip />
        </main>
        <SiteFooter />
        <DownloadBar />
      </div>
      <HomeMotion />
      <Analytics />
    </PlatformProvider>
  );
}
