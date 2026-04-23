"use client"

import { memo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
  Code2,
  Cloud,
  ShieldCheck,
  Database,
  BrainCircuit,
  PenTool,
  Smartphone,
  Crown,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react"
import { TECHNOLOGY_PILLS, TECH_CATEGORIES, type TechCategory } from "@/lib/constants/specialized"
import { scrollToSection } from "@/lib/utils/scroll"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "code-2": Code2,
  "cloud": Cloud,
  "shield-check": ShieldCheck,
  "database": Database,
  "brain-circuit": BrainCircuit,
  "pen-tool": PenTool,
  "smartphone": Smartphone,
  "crown": Crown,
}

/**
 * Tech pill badge
 */
const TechPill = memo(function TechPill({ tech }: { tech: string }) {
  return (
    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#0a3d62] text-white hover:bg-[#0a3d62]/90 hover:shadow-md hover:shadow-[#0a3d62]/20 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
      {tech}
    </span>
  )
})

/**
 * Category card - Clean, minimal design
 */
const CategoryCard = memo(function CategoryCard({
  category,
  onClick,
}: {
  category: TechCategory
  onClick: () => void
}) {
  const IconComponent = ICON_MAP[category.icon] ?? Code2
  const visibleTechs = category.techs.slice(0, 4)

  return (
    <button
      onClick={onClick}
      className="group relative text-left w-full p-6 rounded-2xl bg-white border-4 border-[#f3f3f3] hover:border-[#0a3d62]/10 transition-all duration-500 cursor-pointer overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1"
    >
      {/* Subtle gradient wave background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a3d62]/[0.2] via-transparent to-[#60a3bc]/[0.025]" />
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-tl from-[#0a3d62]/[0.03] to-transparent rounded-full blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0a3d62]/5 flex items-center justify-center group-hover:bg-[#0a3d62] group-hover:shadow-md group-hover:shadow-[#0a3d62]/15 transition-all duration-300">
              <IconComponent className="w-5 h-5 text-[#0a3d62] group-hover:text-white transition-colors duration-300" />
            </div>
            <span className="text-xs font-semibold text-[#0a3d62] uppercase tracking-wider">
              {category.categoryLabel}
            </span>
          </div>
          <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-[#0a3d62] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900 mb-4 group-hover:text-[#0a3d62] transition-colors duration-300">
          {category.title}
        </h3>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {visibleTechs.map((tech, idx) => (
            <span
              key={tech}
              className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-slate-50 text-slate-600 border border-slate-100 group-hover:border-[#0a3d62]/10 group-hover:bg-[#0a3d62]/[0.03] transition-colors duration-300"
              style={{ transitionDelay: `${idx * 30}ms` }}
            >
              {tech}
            </span>
          ))}
          {category.techs.length > 4 && (
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-[#0a3d62]/5 text-[#0a3d62] group-hover:bg-[#0a3d62]/10 transition-colors duration-300">
              +{category.techs.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#0a3d62]/15 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </button>
  )
})

/**
 * Category modal content
 */
const CategoryModal = memo(function CategoryModal({ category }: { category: TechCategory }) {
  const IconComponent = ICON_MAP[category.icon] ?? Code2

  return (
    <div className="p-2">
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[#0a3d62]/5 flex items-center justify-center mb-6">
        <IconComponent className="w-6 h-6 text-[#0a3d62]" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-slate-900 mb-2">{category.title}</h2>
      <p className="text-[#0a3d62] font-medium mb-6">{category.subtitle}</p>

      <Separator className="mb-6" />

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            How we source
          </p>
          <ul className="space-y-2">
            {category.howWeSource.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0a3d62] mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            What you get
          </p>
          <ul className="space-y-2">
            {category.whatYouGet.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0a3d62] mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-3xl font-bold text-[#0a3d62]">{category.stat1Value}</p>
          <p className="text-sm text-slate-500 mt-1">{category.stat1Label}</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-[#0a3d62]">{category.stat2Value}</p>
          <p className="text-sm text-slate-500 mt-1">{category.stat2Label}</p>
        </div>
      </div>
    </div>
  )
})

/**
 * Specialized recruitment section
 */
export function SpecializedRecruitment() {
  const [selectedCategory, setSelectedCategory] = useState<TechCategory | null>(null)

  return (
    <section id="specialized" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="section-kicker mb-6 justify-center">
            Industry-Focused Expertise
          </div>
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-6">
            Specialized Recruitment
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            From technical support and junior software engineers to CTOs — we help you hire the right professionals.
          </p>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {TECHNOLOGY_PILLS.map((tech) => (
            <TechPill key={tech} tech={tech} />
          ))}
        </div>

        <Separator className="mb-12" />

        {/* Category grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 b">
          {TECH_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button
            onClick={() => scrollToSection("#contact")}
            className="group bg-[#0a3d62] hover:bg-[#0a3d62]/90 text-white rounded-xl px-8 py-6 text-base font-medium cursor-pointer shadow-lg shadow-[#0a3d62]/20 hover:shadow-xl hover:shadow-[#0a3d62]/25 hover:-translate-y-0.5 transition-all duration-300"
          >
            Looking for a specific role? Let&apos;s talk
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Dialog
        open={!!selectedCategory}
        onOpenChange={(open) => !open && setSelectedCategory(null)}
      >
        <DialogContent className="max-w-lg rounded-2xl p-6 bg-white shadow-2xl border-0">
          <VisuallyHidden>
            <DialogTitle>{selectedCategory?.title ?? "Category details"}</DialogTitle>
            <DialogDescription>{selectedCategory?.subtitle ?? ""}</DialogDescription>
          </VisuallyHidden>
          {selectedCategory && <CategoryModal category={selectedCategory} />}
        </DialogContent>
      </Dialog>
    </section>
  )
}
