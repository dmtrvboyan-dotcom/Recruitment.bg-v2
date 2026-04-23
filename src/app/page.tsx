import { Suspense } from "react"

// Common components
import {
  Header,
  Footer,
  ScrollReveal,
  SocialSidebar,
} from "@/components/common"

// Landing page feature components
import {
  Hero,
  Services,
  SpecializedRecruitment,
  CompaniesSection,
  SmartRSection,
  JobsSection,
  FAQSection,
  MeetTheTeam,
  CallToAction,
  ExpertiseSection,
} from "@/components/features/landing"

/**
 * Landing page - Clean, premium design
 */
export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* Fixed elements */}
      <Header />
      <SocialSidebar />

      {/* Hero Section */}
      <ScrollReveal>
        <Hero />
      </ScrollReveal>

      {/* Services Section */}
      <ScrollReveal>
        <Services />
      </ScrollReveal>

      {/* Specialized Recruitment */}
      <ScrollReveal>
        <SpecializedRecruitment />
      </ScrollReveal>

       {/* Our Expertise */}
      <ScrollReveal>
        <ExpertiseSection />
      </ScrollReveal>

      {/* Companies Section */}
      <ScrollReveal>
        <CompaniesSection />
      </ScrollReveal>

      {/* Smart.R Platform */}
      <ScrollReveal>
        <SmartRSection />
      </ScrollReveal>



      {/* Job Listings */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <ScrollReveal>
          <JobsSection />
        </ScrollReveal>
      </Suspense>

      {/* FAQ Section */}
      <ScrollReveal>
        <FAQSection />
      </ScrollReveal>

      {/* Meet the Team */}
      <ScrollReveal>
        <MeetTheTeam />
      </ScrollReveal>

      {/* Contact Form */}
      <ScrollReveal>
        <CallToAction />
      </ScrollReveal>

      {/* Footer */}
      <Footer />
    </main>
  )
}
