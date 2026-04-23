"use client"

import { useState, useCallback, memo, useRef } from "react"
import { useEscapeKey, useClickOutside } from "@/lib/hooks"
import { X, Users, Search, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SERVICES, EXECUTIVE_STATS, HIRE_STATS, REMOTE_STATS, type Service } from "@/lib/constants/services"
import { scrollToSection } from "@/lib/utils/scroll"

/**
 * Desktop service card - Clean, minimal design
 */
const ServiceCard = memo(function ServiceCard({
  service,
  onSelect,
  index,
}: {
  service: Service
  onSelect: () => void
  index: number
}) {
  const IconComponent = service.icon

  return (
    <button
      onClick={onSelect}
      className="group relative text-left w-full p-8 rounded-2xl bg-white border border-slate-100 hover:border-[#0a3d62]/10 transition-all duration-500 cursor-pointer overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1"
    >
      {/* Subtle gradient wave - barely visible */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a3d62]/[0.02] via-transparent to-[#60a3bc]/[0.03]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a3d62]/[0.02] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-[#0a3d62]/5 flex items-center justify-center mb-6 group-hover:bg-[#0a3d62] group-hover:shadow-lg group-hover:shadow-[#0a3d62]/20 transition-all duration-300">
          <IconComponent className="w-7 h-7 text-[#0a3d62] group-hover:text-white transition-colors duration-300" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-[#0a3d62] transition-colors duration-300">
          {service.title}
        </h3>

        {/* Subtitle */}
        {service.subtitle && (
          <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
            {service.subtitle}
          </p>
        )}

        {/* Learn more */}
        <div className="flex items-center text-[#0a3d62] font-medium text-sm">
          <span>Learn more</span>
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1.5 transition-transform duration-300" />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#0a3d62]/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </button>
  )
})

/**
 * Sliding panel for service details
 */
const ServicePanel = memo(function ServicePanel({
  service,
  onClose,
}: {
  service: Service | null
  onClose: () => void
}) {
  const handleNavigate = useCallback((href: string) => {
    scrollToSection(href)
    onClose()
  }, [onClose])

  if (!service) return null

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        service ? "visible" : "invisible"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute top-0 right-0 h-full w-full md:w-[560px] bg-white shadow-2xl transform transition-transform duration-500 ease-out overflow-y-auto">
        <div className="p-8 md:p-10">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#0a3d62]/5 flex items-center justify-center mb-8">
            <service.icon className="w-8 h-8 text-[#0a3d62]" />
          </div>

          {/* Title */}
          <h3 className="text-3xl font-bold text-slate-900 mb-3">
            {service.title}
          </h3>

          {/* Subtitle */}
          <p className="text-lg text-[#0a3d62] font-medium mb-6">
            {service.subtitle}
          </p>

          {/* Intro */}
          <p className="text-slate-600 leading-relaxed mb-10">
            {service.intro}
          </p>

          {/* Sections */}
          <div className="space-y-8">
            {service.sections.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-lg font-semibold text-slate-900 mb-4">
                  {section.heading}
                </h4>
                <ul className="space-y-3">
                  {section.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0a3d62] mt-2 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Stats */}
          {service.title === "Executive Search & Headhunting" && (
            <div className="mt-10 pt-8 border-t border-slate-100">
              <div className="grid grid-cols-3 gap-6">
                {EXECUTIVE_STATS.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold text-[#0a3d62]">{stat.value}</div>
                    <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {service.title === "Remote IT Hiring & Global Talent" && (
            <div className="mt-10 pt-8 border-t border-slate-100">
              <div className="grid grid-cols-3 gap-6">
                {REMOTE_STATS.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold text-[#0a3d62]">{stat.value}</div>
                    <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {service.title === "Hire Contract or Freelance Developers" && (
            <div className="mt-10 pt-8 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  {HIRE_STATS.map((stat, idx) => (
                    <div key={idx}>
                      <div className="text-2xl font-bold text-[#0a3d62]">{stat.value}</div>
                      <div className="text-sm text-slate-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => handleNavigate("#specialized")}
                  className="bg-[#0a3d62] hover:bg-[#0a3d62]/90 text-white rounded-xl px-6 py-3"
                >
                  Learn more
                </Button>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="mt-10 flex gap-4">
            {service.title === "Permanent IT Recruitment" && (
              <Button
                onClick={() => handleNavigate("#companies")}
                className="bg-[#0a3d62] hover:bg-[#0a3d62]/90 text-white rounded-xl px-6 py-3"
              >
                Learn more <Users className="w-4 h-4 ml-2" />
              </Button>
            )}

            {service.title === "IT Salary Benchmarking & Hiring Insights" && (
              <Button
                onClick={() => handleNavigate("#contact")}
                className="bg-[#0a3d62] hover:bg-[#0a3d62]/90 text-white rounded-xl px-6 py-3"
              >
                Get insights <Search className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

/**
 * Services section - Clean, conversion-focused design
 */
export function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const closePanel = useCallback(() => setSelectedService(null), [])
  useEscapeKey(closePanel)

  return (
    <section id="services" className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="section-kicker mb-6 justify-center">
            Our Services
          </div>
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-6">
            How We Help You Hire
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Comprehensive recruitment solutions designed to find, attract, and secure the best tech talent for your team.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              onSelect={() => setSelectedService(service)}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="group relative inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#0a3d62]/10 transition-all duration-500 overflow-hidden">
            {/* Subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a3d62]/[0.01] via-transparent to-[#60a3bc]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 w-12 h-12 rounded-xl bg-[#0a3d62] flex items-center justify-center shadow-md shadow-[#0a3d62]/15">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="relative z-10 text-slate-600">
              End-to-end recruitment helping companies hire top tech talent.
            </p>
            <Button
              onClick={() => scrollToSection("#contact")}
              variant="ghost"
              className="relative z-10 text-[#0a3d62] hover:text-[#0a3d62]/80 font-medium"
            >
              Contact us <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Service detail panel */}
      <ServicePanel service={selectedService} onClose={closePanel} />
    </section>
  )
}
