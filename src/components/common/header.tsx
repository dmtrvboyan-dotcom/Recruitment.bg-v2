"use client"

import { useState, useCallback, memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { NAV_ITEMS, type NavItem } from "@/lib/constants/navigation"
import { scrollToSection, scrollToTop } from "@/lib/utils/scroll"
import { useScrollState, useEscapeKey, useBodyScrollLock } from "@/lib/hooks"

/**
 * Desktop dropdown menu
 */
const DesktopDropdown = memo(function DesktopDropdown({
  item,
  isOpen,
  onToggle,
  onNavigate,
}: {
  item: NavItem
  isOpen: boolean
  onToggle: () => void
  onNavigate: (href: string, openInNewTab?: boolean) => void
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-2"
      >
        {item.label}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-2 transition-all duration-200 ${
          isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
      >
        {item.dropdownItems?.map((subItem) => (
          <button
            key={subItem.label}
            onClick={() => onNavigate(subItem.href, subItem.openInNewTab)}
            className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            {subItem.label}
          </button>
        ))}
      </div>
    </div>
  )
})

/**
 * Mobile dropdown menu
 */
const MobileDropdown = memo(function MobileDropdown({
  item,
  isOpen,
  onToggle,
  onNavigate,
}: {
  item: NavItem
  isOpen: boolean
  onToggle: () => void
  onNavigate: (href: string, openInNewTab?: boolean) => void
}) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-4 text-lg text-white"
      >
        {item.label}
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div className={`overflow-hidden transition-all ${isOpen ? "max-h-60 pb-4" : "max-h-0"}`}>
        <div className="pl-4 space-y-2">
          {item.dropdownItems?.map((subItem) => (
            <button
              key={subItem.label}
              onClick={() => onNavigate(subItem.href, subItem.openInNewTab)}
              className="block w-full text-left py-2 text-white/80 hover:text-white"
            >
              {subItem.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
})

/**
 * Main header component
 */
export function Header() {
  const isScrolled = useScrollState()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }, [])

  useEscapeKey(closeMenu)
  useBodyScrollLock(isMenuOpen)

  const handleNavigate = useCallback((href: string, openInNewTab?: boolean) => {
    if (openInNewTab) {
      window.open(href, "_blank", "noopener,noreferrer")
    } else if (href.startsWith("#")) {
      if (window.location.pathname === "/") {
        scrollToSection(href)
      } else {
        window.location.href = "/" + href
      }
    } else {
      window.location.href = href
    }
    closeMenu()
  }, [closeMenu])

  const handleDropdownToggle = useCallback((label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label))
  }, [])

  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    if (window.location.pathname === "/") {
      e.preventDefault()
      scrollToTop()
    }
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-sm py-4" 
            : "bg-transparent py-6"
        }`}
        style={{ paddingRight: "var(--scrollbar-width, 0px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" onClick={handleLogoClick} className="flex-shrink-0">
              <img
                src="/uploaded/recr-logo.png"
                alt="Recruitment.bg"
                className="h-9 lg:h-10 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <div className={`hidden lg:flex items-center gap-8 transition-opacity ${
              isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}>
              {NAV_ITEMS.map((item) =>
                item.hasDropdown ? (
                  <DesktopDropdown
                    key={item.label}
                    item={item}
                    isOpen={openDropdown === item.label}
                    onToggle={() => handleDropdownToggle(item.label)}
                    onNavigate={handleNavigate}
                  />
                ) : (
                  <button
                    key={item.label}
                    onClick={() => handleNavigate(item.href!)}
                    className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {item.label}
                  </button>
                )
              )}

              <Button
                onClick={() => handleNavigate("#contact")}
                className="bg-[#0a3d62] hover:bg-[#0a3d62]/90 text-white rounded-xl px-6 py-5 text-sm font-medium"
              >
                Contact Us
              </Button>
            </div>

            {/* Menu button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`p-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors ${
                isScrolled ? "block" : "block lg:hidden"
              }`}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[999] transition-all duration-300 ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full sm:w-96 bg-[#0a3d62] transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full p-8">
            {/* Close button */}
            <button
              onClick={closeMenu}
              className="absolute top-6 right-6 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <div className="flex-1 pt-16 overflow-y-auto">
              {NAV_ITEMS.map((item) =>
                item.hasDropdown ? (
                  <MobileDropdown
                    key={item.label}
                    item={item}
                    isOpen={openDropdown === item.label}
                    onToggle={() => handleDropdownToggle(item.label)}
                    onNavigate={handleNavigate}
                  />
                ) : (
                  <button
                    key={item.label}
                    onClick={() => handleNavigate(item.href!)}
                    className="block w-full text-left py-4 text-lg text-white border-b border-white/10"
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>

            {/* CTA */}
            <Button
              onClick={() => handleNavigate("#contact")}
              className="w-full bg-white text-[#0a3d62] hover:bg-white/90 rounded-xl py-6 text-base font-medium"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
