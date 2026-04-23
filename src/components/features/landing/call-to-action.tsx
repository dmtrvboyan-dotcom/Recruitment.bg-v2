"use client"

import { useState, useCallback, memo } from "react"
import { ContactForm } from "./contact-form"
import { Button } from "@/components/ui/button"

type TabType = "candidate" | "company"

/**
 * Tab button
 */
const TabButton = memo(function TabButton({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
        isActive
          ? "bg-[#0a3d62] text-white shadow-md shadow-[#0a3d62]/20"
          : "text-slate-600 hover:text-[#0a3d62] hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  )
})

/**
 * Call to action / Contact section
 */
export function CallToAction() {
  const [activeTab, setActiveTab] = useState<TabType>("company")

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-slate-50 overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-kicker mb-6 justify-center">
            Get in Touch
          </div>
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-6">
            Let&apos;s Start a Conversation
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Whether you&apos;re looking to hire top IT talent or seeking your next career opportunity, we&apos;re here to help.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
            <TabButton
              label="I'm a Company"
              isActive={activeTab === "company"}
              onClick={() => setActiveTab("company")}
            />
            <TabButton
              label="I'm a Candidate"
              isActive={activeTab === "candidate"}
              onClick={() => setActiveTab("candidate")}
            />
          </div>
        </div>

        {/* Contact form */}
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-100 p-8 lg:p-10 shadow-[0_4px_24px_rgba(10,61,98,0.04)]">
            <ContactForm key={activeTab} mode={activeTab} />
          </div>
        </div>
      </div>
    </section>
  )
}
