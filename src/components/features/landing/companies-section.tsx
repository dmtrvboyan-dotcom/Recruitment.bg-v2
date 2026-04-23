"use client"

import { useCallback, memo } from "react"
import Image from "next/image"
import { CheckCircle, Users, BarChart3, MessageCircle, ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { scrollToSection } from "@/lib/utils/scroll"

/**
 * Feature data
 */
const FEATURES = [
  {
    icon: Users,
    badge: "Talent Network",
    imagebadge: "Access 31,000+ Curated Tech Professionals",
    title: "Access 31,000+ Curated Tech Professionals",
    description: "Our extensive database of pre-vetted developers, engineers, and tech leaders gives you direct access to talent that matches your exact requirements.",
    points: [
      "Pre-screened senior developers and engineers",
      "Verified technical skills and experience",
      "Ready-to-interview candidates within days",
    ],
    image: "/images/talent-network.jpg",
  },
  {
    icon: CheckCircle,
    badge: "Cultural Fit",
    title: "High Retention Through Smart Matching",
    description: "We go beyond technical skills. Our matching process considers cultural fit, career aspirations, and team dynamics to ensure long-term success.",
    points: [
      "Deep understanding of your company culture",
      "Personality and work style assessment",
      "95% retention rate after first year",
    ],
    image: "/images/culture-match.jpg",
  },
  {
    icon: BarChart3,
    badge: "Market Intelligence",
    title: "Data-Driven Hiring Insights",
    description: "Stay ahead with real-time market data on salaries, availability, and hiring trends. Make informed decisions backed by industry intelligence.",
    points: [
      "Competitive salary benchmarking",
      "Real-time talent availability data",
      "Industry-specific hiring trends",
    ],
    image: "/images/market-insights.jpg",
  },
  {
    icon: MessageCircle,
    badge: "Speed & Clarity",
    title: "Lightning-Fast Communication",
    description: "Your hiring needs are never deprioritized. Expect honest feedback, transparent processes, and rapid responses.",
    points: [
      "Direct recruiter communication",
      "Honest market feedback always",
      "Your role stays our priority",
    ],
    image: "/images/fast-communication.jpg",
  },
]

/**
 * Feature point with checkmark
 */
const FeaturePoint = memo(function FeaturePoint({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="w-5 h-5 rounded-full bg-[#0a3d62] flex items-center justify-center flex-shrink-0 mt-0.5">
        <CheckCircle className="w-3 h-3 text-white" />
      </div>
      <span className="text-slate-600">{text}</span>
    </li>
  )
})

/**
 * Feature block with alternating layout
 */
const FeatureBlock = memo(function FeatureBlock({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[0]
  index: number
}) {
  const isReversed = index % 2 === 1
  const Icon = feature.icon

  return (
    <div className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20`}>
      {/* Image */}
      <div className="w-full lg:w-1/2">
        <div className="relative group">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Badge on image */}
          <div className={`absolute -bottom-4 ${isReversed ? "-left-4" : "-right-4"} bg-[#0a3d62] text-white px-5 py-3 rounded-xl shadow-lg`}>
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{feature.imagebadge}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a3d62]/5 text-[#0a3d62] text-xs font-semibold uppercase tracking-wider mb-4">
          <Zap className="w-3 h-3" />
          {feature.badge}
        </div>

        <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">
          {feature.title}
        </h3>

        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          {feature.description}
        </p>

        <ul className="space-y-3">
          {feature.points.map((point, i) => (
            <FeaturePoint key={i} text={point} />
          ))}
        </ul>
      </div>
    </div>
  )
})

/**
 * Companies section - Why companies choose us
 */
export function CompaniesSection() {
  const handleNavigate = useCallback(() => {
    scrollToSection("#contact")
  }, [])

  return (
    <section id="companies" className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden">
      {/* Subtle grid backdrop */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="section-kicker mb-6 justify-center">
our strengths
          </div>
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-6">
            Why Companies Work With Us
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            With deep industry expertise and a personalized approach, we connect companies with pre-vetted senior developers and engineers who truly fit your culture.
          </p>
        </div>

        {/* Feature blocks */}
        <div className="space-y-24 lg:space-y-32">
          {FEATURES.map((feature, index) => (
            <FeatureBlock key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA Card — Teamtailor style dark panel */}
        <div className="mt-24 lg:mt-32">
          <div className="relative bg-[#0a3d62] rounded-3xl p-10 lg:p-16 text-center overflow-hidden group">
            {/* Animated blob decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#60a3bc]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 animate-blob" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 animate-blob" style={{ animationDelay: "8s" }} />
            </div>

            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            <div className="relative z-10">
              <h3 className="display-heading text-3xl lg:text-5xl text-white mb-5">
                Ready to build your dream team?
              </h3>
              <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Let&apos;s discuss how we can help you find the perfect tech talent for your company.
              </p>
              <Button
                onClick={handleNavigate}
                className="bg-white text-[#0a3d62] hover:bg-white rounded-full px-8 py-6 text-base font-semibold cursor-pointer btn-shine cta-magnetic group/btn"
              >
                Start a conversation
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
