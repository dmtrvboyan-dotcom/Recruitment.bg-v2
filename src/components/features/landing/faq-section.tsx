"use client"

import { useState, useCallback, memo } from "react"
import { ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FAQ_ITEMS, type FAQItem } from "@/lib/constants/faq"
import { scrollToSection } from "@/lib/utils/scroll"

/**
 * FAQ accordion item
 */
const FAQItem = memo(function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: FAQItem
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className={`border-b border-slate-100 last:border-b-0 ${isOpen ? "bg-slate-50/60" : ""} transition-colors duration-300`}>
      <button
        onClick={onToggle}
        className="w-full py-6 px-6 flex items-center justify-between text-left group cursor-pointer"
      >
        <div className="flex items-center gap-4 pr-8">
          <span className={`text-xs font-mono font-semibold transition-colors duration-300 ${isOpen ? "text-[#0a3d62]" : "text-slate-400"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className={`text-lg font-medium transition-colors duration-300 ${isOpen ? "text-[#0a3d62]" : "text-slate-900 group-hover:text-[#0a3d62]"}`}>
            {faq.q}
          </h3>
        </div>

        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? "bg-[#0a3d62] text-white" : "bg-slate-100 text-slate-400 group-hover:bg-[#0a3d62]/10 group-hover:text-[#0a3d62]"}`}>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-500 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <div
        className={`grid transition-all duration-500 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pl-16 text-slate-600 leading-relaxed">
            {faq.a}
          </div>
        </div>
      </div>
    </div>
  )
})

/**
 * FAQ section - Clean accordion design
 */
export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([0])

  const handleNavigate = useCallback(() => {
    scrollToSection("#contact")
  }, [])

  const toggleItem = useCallback((index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }, [])

  return (
    <section id="faq" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-kicker mb-6 justify-center">
            Got Questions?
          </div>
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Everything you need to know about working with us.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-[0_4px_24px_rgba(10,61,98,0.04)]">
          {FAQ_ITEMS.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openItems.includes(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">Still have questions?</p>
          <Button
            onClick={handleNavigate}
            className="bg-[#0a3d62] hover:bg-[#0a3d62]/90 text-white rounded-xl px-8 py-6 text-base font-medium cursor-pointer"
          >
            Let&apos;s talk
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
