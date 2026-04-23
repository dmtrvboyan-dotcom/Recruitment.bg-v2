"use client"

import { memo } from "react"
import Image from "next/image"
import { RiLinkedinBoxFill } from "react-icons/ri"
import { TEAM_MEMBERS, COMPANY_VALUES, type TeamMember } from "@/lib/constants/team"
import { useCarouselScroll } from "@/lib/hooks/use-carousel-scroll"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"

/**
 * Company value item
 */
const ValueItem = memo(function ValueItem({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-6 h-6 rounded-full bg-[#0a3d62] flex items-center justify-center flex-shrink-0 mt-0.5">
        <Check className="w-3.5 h-3.5 text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
})

/**
 * Team member card
 */
const TeamMemberCard = memo(function TeamMemberCard({
  member,
}: {
  member: TeamMember
}) {
  return (
    <div className="flex-shrink-0 w-[280px] snap-start">
      <div className="text-center">
        {/* Avatar */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover rounded-full border-3 border-[#0a3d62]"
          />
        </div>

        {/* Name & LinkedIn */}
        <h4 className="font-semibold text-slate-900 mb-1">{member.name}</h4>
        
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-[#0a3d62] hover:text-[#60a3bc] transition-colors mb-3"
          >
            <RiLinkedinBoxFill size={24} />
          </a>
        )}

        {/* Quote */}
        <p className="text-slate-500 text-sm italic leading-relaxed px-2">
          &quot;{member.quote}&quot;
        </p>
      </div>
    </div>
  )
})

/**
 * Meet the team section
 */
export function MeetTheTeam() {
  const {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  } = useCarouselScroll()

  return (
    <section id="about" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="section-kicker mb-6 justify-center">
            Meet the Team
          </div>
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-6">
    Nice to meet you
          </h2>
          {/* <p className="text-xl text-slate-600 leading-relaxed">
            A dedicated team of recruitment specialists committed to connecting talent with opportunity.
          </p> */}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 text-slate-600">
              <Check className="w-4 h-4 text-[#0a3d62]" />
              <span className="text-sm font-medium">15+ IT Recruitment Experience</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Check className="w-4 h-4 text-[#0a3d62]" />
              <span className="text-sm font-medium">Avg 2-10 Presenting Candidates</span>
            </div>
          </div>

          
        </div>

        {/* Team photo */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl mb-16">
          <Image
            src="/uploaded/team2.jpg"
            alt="Our Team"
            width={1400}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        </div>

        {/* Company values */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {COMPANY_VALUES.map((value, index) => (
            <ValueItem key={index} title={value.title} description={value.description} />
          ))}
        </div>

        {/* Team carousel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar py-4"
          >
            {TEAM_MEMBERS.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              aria-label="Previous team members"
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                canScrollLeft
                  ? "bg-[#0a3d62] text-white hover:bg-[#0a3d62]/90 hover:-translate-x-0.5 shadow-md shadow-[#0a3d62]/20"
                  : "bg-slate-100 text-slate-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              aria-label="Next team members"
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                canScrollRight
                  ? "bg-[#0a3d62] text-white hover:bg-[#0a3d62]/90 hover:translate-x-0.5 shadow-md shadow-[#0a3d62]/20"
                  : "bg-slate-100 text-slate-300 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
