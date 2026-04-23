"use client"

import { useCallback, memo } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, Briefcase, Clock, Award } from "lucide-react"
import { scrollToSection } from "@/lib/utils/scroll"

/**
 * Stat item — inline floating chip
 */
const StatItem = memo(function StatItem({
  value,
  label,
  icon: Icon,
  delay = 0,
}: {
  value: string
  label: string
  icon: React.ElementType
  delay?: number
}) {
  return (
    <div
      className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="sm:w-12 sm:h-12 w-8 h-8 rounded-xl bg-[#0a3d62]/5 flex items-center justify-center shrink-0 group-hover:bg-[#0a3d62] transition-colors duration-300">
        <Icon className="sm:w-6 sm:h-6 w-4 h-4 text-[#0a3d62] group-hover:text-white transition-colors duration-300" />
      </div>
      <div className="text-left">
        <p className="lg:text-2xl text-md font-bold text-[#0a3d62]">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  )
})

/**
 * Hero section — Clean, minimal, conversion-focused (Teamtailor + HRS-BG inspired visuals)
 */
export const Hero = memo(function Hero() {
  const handleNavigate = useCallback((href: string) => {
    scrollToSection(href, { highlightDuration: 0 })
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.5] pointer-events-none" />

      {/* Soft decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#0a3d62]/[0.07] via-[#60a3bc]/[0.04] to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 animate-blob" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#60a3bc]/[0.05] to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 animate-blob" style={{ animationDelay: "6s" }} />
      </div>

      {/* White gradient mask to soften pattern edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-white pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a3d62]/5 border border-[#0a3d62]/10 mb-8 opacity-0 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-[#0a3d62]">
              Now hiring across Europe
            </span>
          </div>

          {/* Main headline */}
          <h1 className="display-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-[1.1] tracking-tight mb-6 opacity-0 animate-fade-in-up delay-100">
            IT Recruitment Agency{" "}
            <br className="hidden sm:block" />
            <span className="text-[#0a3d62]">for Tech Roles</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in-up delay-200">
            We connect companies with IT professionals through recruitment and talent acquisition services that deliver results.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 animate-fade-in-up delay-300">
            <Button
              onClick={() => handleNavigate("#contact")}
              className="w-full sm:w-auto bg-[#0a3d62] hover:bg-[#0a3d62]/90 text-white rounded-xl px-8 py-6 text-base font-medium cursor-pointer group btn-shine cta-magnetic"
            >
              <span className="flex items-center gap-2">
                Start Hiring
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>

            <Button
              onClick={() => handleNavigate("#jobs")}
              variant="outline"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 rounded-xl px-8 py-6 text-base font-medium border-2 border-slate-200 hover:border-[#0a3d62]/20 cursor-pointer magnetic group"
            >
              <Play className="w-4 h-4 mr-2 text-[#0a3d62] group-hover:scale-110 transition-transform duration-300" />
              Find a Job
            </Button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <StatItem value="31,000+" label="Candidates" icon={Users} delay={400} />
            <StatItem value="300+" label="Companies" icon={Briefcase} delay={550} />
            <StatItem value="98%" label="Success Rate" icon={Award} delay={450} />
            <StatItem value="14 Days" label="Avg. Time to Hire" icon={Clock} delay={500} />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
          <button
            onClick={() => handleNavigate("#services")}
            className="text-slate-400 hover:text-[#0a3d62] transition-colors cursor-pointer"
            aria-label="Scroll to services"
          >
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
})
