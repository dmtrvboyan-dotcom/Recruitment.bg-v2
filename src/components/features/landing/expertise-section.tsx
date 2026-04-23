"use client"

import { memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"

/**
 * Expertise areas data
 */
const EXPERTISE_AREAS = [
  {
    title: "Fintech Recruitment",
    description: "Expert recruitment for fintech, banking, payments, and financial technology companies.",
    href: "/expertise-services/fintech-recruitment",
    image: "/images/expertise/fintech.jpg",
    stats: "200+ placements",
  },
  {
    title: "iGaming Recruitment",
    description: "Dedicated recruitment solutions for the fast-paced iGaming and online betting industry.",
    href: "/expertise-services/igaming-recruitment",
    image: "/images/expertise/igaming.jpg",
    stats: "150+ placements",
  },
  {
    title: "SaaS Recruitment",
    description: "SaaS recruitment for engineers, DevOps, and technical leaders across Bulgaria and Europe.",
    href: "/expertise-services/saas-recruitment",
    image: "/images/expertise/saas.jpg",
    stats: "300+ placements",
  },
  {
    title: "E-commerce Recruitment",
    description: "Ecommerce recruitment for Shopify, Magento, and online retail teams across Europe.",
    href: "/expertise-services/ecommerce-recruitment",
    image: "/images/expertise/ecommerce.jpg",
    stats: "180+ placements",
  },
  {
    title: "AI / ML Recruitment",
    description: "AI recruitment for machine learning engineers, data scientists, and MLOps teams.",
    href: "/expertise-services/aiml-recruitment",
    image: "/images/expertise/aiml.jpg",
    stats: "100+ placements",
  },
  {
    title: "Cybersecurity Recruitment",
    description: "Cybersecurity recruitment for security engineers, SOC analysts, and DevSecOps teams.",
    href: "/expertise-services/cybersecurity-recruitment",
    image: "/images/expertise/cybersecurity.jpg",
    stats: "120+ placements",
  },
]

/**
 * Expertise card component
 */
const ExpertiseCard = memo(function ExpertiseCard({
  item,
}: {
  item: (typeof EXPERTISE_AREAS)[0]
}) {
  return (
    <Link
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative overflow-hidden rounded-2xl bg-white border border-slate-100 hover:border-[#0a3d62]/15 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Subtle gradient for minimal pastel images */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a3d62]/70 via-[#0a3d62]/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* Stats badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white text-[#0a3d62] text-xs font-semibold shadow-sm">
          {item.stats}
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">
          {item.title}
        </h3>

        <p className="text-white/85 text-sm leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center text-white/90 text-sm font-medium">
          <span>Learn more</span>
          <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </div>
      </div>

      {/* Hover border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#0a3d62]/15 transition-colors duration-300 pointer-events-none" />
    </Link>
  )
})

/**
 * Expertise section - Industry specialists
 */
export function ExpertiseSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="section-kicker mb-6 justify-center">
            Our Expertise
          </div>
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-6">
            Industry Specialists
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            From specialized technical roles to executive leadership, we deliver tailored recruitment solutions across key industries.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERTISE_AREAS.map((item, index) => (
            <ExpertiseCard key={index} item={item} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <p className="text-slate-600">Not sure where to start?</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#0a3d62] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#0a3d62]/90 transition-colors"
            >
              Contact us
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
