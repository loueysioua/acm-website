"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/shared/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 900);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Activities", href: "/activities" },
    { name: "Achievements", href: "/achievements" },
    { name: "Articles", href: "/articles" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-nav" : "glass-nav"
      }`}
    >
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-80"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center ">
            <div className="w-25 h-25 relative">
              <Image
                src="/logos/acm-blue-logo.png"
                alt="ACM INSAT Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-2xl font-bold">
              <span className="text-foreground drop-shadow-sm">ACM</span>{" "}
              <span
                className={`${
                  isScrolled ? "text-primary" : "text-background"
                } drop-shadow-sm`}
              >
                INSAT
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-accent transition-all duration-300 font-medium drop-shadow-sm relative group px-3 py-2 rounded-lg hover:glass-accent"
              >
                {item.name}
                <span className="absolute -bottom-1 left-3 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-[calc(100%-24px)]"></span>
              </a>
            ))}
            <Button className="glass-button text-white font-medium transition-all duration-300 hover:scale-105">
              Join Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden glass border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-accent transition-all duration-300 rounded-lg hover:glass-accent"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 py-2">
                <Button className="w-full glass-button text-white font-medium">
                  Join Us
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
