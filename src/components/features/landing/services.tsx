"use client"

import { useState, useCallback, memo, useEffect } from "react"
import { useEscapeKey } from "@/lib/hooks"
import { Users, Search, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SERVICES, EXECUTIVE_STATS, HIRE_STATS, REMOTE_STATS, type Service } from "@/lib/constants/services"
import { scrollToSection } from "@/lib/utils/scroll"

/**
 * Shared service details content - used in both mobile accordion and desktop slide panel
 */
const ServiceDetails = memo(function ServiceDetails({
  service,
  onNavigate,
}: {
  service: Service
  onNavigate: (href: string) => void
}) {
  return (
    <>
      {/* Intro */}
      <p className="text-slate-600 leading-relaxed mb-7">{service.intro}</p>

      {/* Sections */}
      <div className="space-y-6">
        {service.sections.map((section, idx) => (
          <div key={idx}>
            <h4 className="text-base font-semibold text-slate-900 mb-3">
              {section.heading}
            </h4>
            <ul className="space-y-2.5">
              {section.points.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0a3d62] mt-2 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Conditional stats blocks */}
      {service.title === "Executive Search & Headhunting" && (
        <div className="mt-7 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4">
          {EXECUTIVE_STATS.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl font-bold text-[#0a3d62]">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {service.title === "Remote IT Hiring & Global Talent" && (
        <div className="mt-7 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4">
          {REMOTE_STATS.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl font-bold text-[#0a3d62]">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {service.title === "Hire Contract or Freelance Developers" && (
        <div className="mt-7 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
          <div>
            {HIRE_STATS.map((stat, idx) => (
              <div key={idx}>
                <div className="text-2xl font-bold text-[#0a3d62]">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
          <Button
            onClick={() => onNavigate("#specialized")}
            className="bg-[#0a3d62] hover:bg-[#0a3d62]/90 text-white rounded-xl px-5 py-2.5 text-sm cursor-pointer"
          >
            Learn more
          </Button>
        </div>
      )}

      {/* CTA Buttons for other services */}
      {(service.title === "Permanent IT Recruitment" ||
        service.title === "IT Salary Benchmarking & Hiring Insights") && (
          <div className="mt-7 flex flex-wrap gap-3">
            {service.title === "Permanent IT Recruitment" && (
              <Button
                onClick={() => onNavigate("#companies")}
                className="bg-[#0a3d62] hover:bg-[#0a3d62]/90 text-white rounded-xl px-5 py-2.5 text-sm cursor-pointer"
              >
                Learn more <Users className="w-4 h-4 ml-2" />
              </Button>
            )}
            {service.title === "IT Salary Benchmarking & Hiring Insights" && (
              <Button
                onClick={() => onNavigate("#contact")}
                className="bg-[#0a3d62] hover:bg-[#0a3d62]/90 text-white rounded-xl px-5 py-2.5 text-sm cursor-pointer"
              >
                Get insights <Search className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        )}
    </>
  )
})

/**
 * Service card - triggers panel on desktop / inline accordion on mobile
 */
const ServiceCard = memo(function ServiceCard({
  service,
  isExpanded,
  onToggle,
}: {
  service: Service
  isExpanded: boolean
  onToggle: () => void
}) {
  const IconComponent = service.icon

  return (
    <button
      onClick={onToggle}
      aria-expanded={isExpanded}
      className={`group relative text-left w-full p-8 rounded-2xl bg-white border transition-all duration-500 cursor-pointer overflow-hidden ${isExpanded
          ? "border-[#0a3d62]/20 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
          : "border-slate-100 hover:border-[#0a3d62]/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1"
        }`}
    >
      {/* Subtle gradient wave */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a3d62]/[0.02] via-transparent to-[#60a3bc]/[0.03]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a3d62]/[0.02] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${isExpanded
              ? "bg-[#0a3d62] shadow-lg shadow-[#0a3d62]/20"
              : "bg-[#0a3d62]/5 group-hover:bg-[#0a3d62] group-hover:shadow-lg group-hover:shadow-[#0a3d62]/20"
            }`}
        >
          <IconComponent
            className={`w-7 h-7 transition-colors duration-300 ${isExpanded ? "text-white" : "text-[#0a3d62] group-hover:text-white"
              }`}
          />
        </div>

        {/* Title */}
        <h3
          className={`text-xl font-semibold mb-3 transition-colors duration-300 ${isExpanded ? "text-[#0a3d62]" : "text-slate-900 group-hover:text-[#0a3d62]"
            }`}
        >
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
          <ChevronRight
            className={`w-4 h-4 ml-1 transition-transform duration-500 ${isExpanded
                ? "rotate-90 md:rotate-0 md:translate-x-1.5"
                : "group-hover:translate-x-1.5"
              }`}
          />
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#0a3d62]/20 to-transparent transition-transform duration-500 ${isExpanded ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
      />
    </button>
  )
})

/**
 * Desktop sliding panel - 40vw from right edge with smooth transform animation
 */
const ServicePanel = memo(function ServicePanel({
  service,
  isOpen,
  onClose,
  onNavigate,
}: {
  service: Service | null
  isOpen: boolean
  onClose: () => void
  onNavigate: (href: string) => void
}) {
  // Lock body scroll while open (desktop only)
  useEffect(() => {
    if (typeof window === "undefined") return
    if (isOpen && window.matchMedia("(min-width: 768px)").matches) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isOpen])

  return (
    <div
      className={`fixed inset-0 z-50 hidden md:block ${isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"
          }`}
        onClick={onClose}
      />

      {/* Panel - slides in from right at 40vw */}
      <div
        className={`absolute top-0 right-0 h-full w-[40vw] min-w-[460px] max-w-[720px] bg-white shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Close button - positioned on left edge, vertically centered */}
        <button
          onClick={onClose}
          aria-label="Close panel"
          className={`group absolute top-1/2 -translate-y-1/2 -left-6 w-12 h-12 rounded-full bg-white shadow-lg hover:bg-[#0a3d62] flex items-center justify-center transition-all duration-300 cursor-pointer z-10 hover:scale-110 border border-slate-100 ${isOpen ? "opacity-100" : "opacity-0"
            }`}
        >
          <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors duration-300" />
        </button>

        {service && (
          <div className="h-full overflow-y-auto flex items-center">
            <div className="w-full p-8 lg:p-10">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[#0a3d62]/5 flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-[#0a3d62]" />
              </div>

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                {service.title}
              </h3>

              {/* Subtitle */}
              {service.subtitle && (
                <p className="text-base text-[#0a3d62] font-medium mb-6">
                  {service.subtitle}
                </p>
              )}

              {/* Shared details */}
              <ServiceDetails service={service} onNavigate={onNavigate} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

/**
 * Services section - Clean, conversion-focused design
 * Desktop: clicking a card opens a sliding panel from the right (40vw)
 * Mobile: clicking a card expands an inline accordion below it
 */
export function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const closePanel = useCallback(() => setExpandedIndex(null), [])
  useEscapeKey(closePanel)

  const toggleService = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index))
  }, [])

  const handleNavigate = useCallback(
    (href: string) => {
      scrollToSection(href)
      closePanel()
    },
    [closePanel]
  )

  const selectedService = expandedIndex !== null ? SERVICES[expandedIndex] : null

  return (
    <section id="services" className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="section-kicker mb-6 justify-center">Our Services</div>
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-6">
            How We Help You Hire
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Comprehensive recruitment solutions designed to find, attract, and secure the best tech talent for your team.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const isExpanded = expandedIndex === index
            return (
              <div key={index} className="flex flex-col">
                <ServiceCard
                  service={service}
                  isExpanded={isExpanded}
                  onToggle={() => toggleService(index)}
                />

                {/* Mobile-only inline accordion (same animation pattern as FAQ) */}
                <div
                  className={`md:hidden grid transition-all duration-500 ease-out ${isExpanded
                      ? "grid-rows-[1fr] opacity-100 mt-3"
                      : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="bg-white rounded-2xl border border-[#0a3d62]/15 p-6 shadow-[0_4px_20px_rgba(10,61,98,0.05)]">
                      <ServiceDetails service={service} onNavigate={handleNavigate} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
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

      {/* Desktop slide-in panel */}
      <ServicePanel
        service={selectedService}
        isOpen={selectedService !== null}
        onClose={closePanel}
        onNavigate={handleNavigate}
      />
    </section>
  )
}
