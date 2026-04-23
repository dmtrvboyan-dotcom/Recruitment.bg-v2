"use client"

import { useCallback, memo } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Check } from "lucide-react"
import { scrollToSection } from "@/lib/utils/scroll"
import Image from "next/image"
import Link from "next/link"

const FEATURES = [
  "Applicant tracking system",
  "Candidate management",
  "Pipeline visualization",
  "Team collaboration",
  "Analytics & reporting",
  "Integration ready",
]

/**
 * Smart.R ATS section - Clean product showcase
 */
export const SmartRSection = memo(function SmartRSection() {
  const handleNavigate = useCallback(() => {
    scrollToSection("#contact")
  }, [])

  return (
    <section id="smartr" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a3d62]/5 border border-[#0a3d62]/10 text-[#0a3d62] text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="uppercase tracking-[0.15em] text-xs font-semibold">Own Technology</span>
          </div>

          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-6">
            Smart.R — Applicant Tracking System
          </h2>

          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            A powerful recruitment platform built by recruiters, for recruiters. Streamline your hiring process from start to finish.
          </p>

          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-50 text-green-700 border border-green-200 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Now available for purchase
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
          {FEATURES.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-slate-600">
              <Check className="w-4 h-4 text-[#0a3d62]" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/applicant-tracking-system" target="_blank">
            <Button className="bg-[#0a3d62] hover:bg-[#0a3d62]/90 text-white rounded-xl px-8 py-6 text-base font-medium cursor-pointer">
              Learn more
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Button
            onClick={handleNavigate}
            variant="outline"
            className="bg-white text-slate-900 border-2 border-slate-200 hover:border-[#0a3d62]/20 hover:bg-slate-50 rounded-xl px-8 py-6 text-base font-medium cursor-pointer"
          >
            Book a demo
          </Button>
        </div>

        {/* Product screenshot */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <Image
              src="/uploaded/product-smart.png"
              alt="Smart.R Applicant Tracking System Dashboard"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-[#0a3d62]/5 to-[#60a3bc]/5 rounded-3xl blur-xl" />
        </div>
      </div>
    </section>
  )
})
