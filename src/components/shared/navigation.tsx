"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/shared/ui/button";
import {
  CalendarHeart,
  House,
  Menu,
  Phone,
  ScrollText,
  Trophy,
  UserRoundPlus,
  UserRoundSearch,
  X,
} from "lucide-react";
import Image from "next/image";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 900);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: <House /> },
    { name: "About", href: "/about", icon: <UserRoundSearch /> },
    { name: "Activities", href: "/activities", icon: <ScrollText /> },
    { name: "Achievements", href: "/achievements", icon: <Trophy /> },
    { name: "Articles", href: "/articles", icon: <CalendarHeart /> },
    { name: "Contact", href: "/contact", icon: <Phone /> },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${"glass-nav"}`}
    >
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-80"></div>

      <div className="container mx-auto sm:px-4 lg:px-3 ">
        <div className="flex items-center justify-between h-20 ">
          {/* Logo */}
          <div className="flex items-center gap-0">
            <div
              className={` ${isScrolled ? "w-25 h-25" : "w-55 h-55"} relative`}
            >
              <Image
                src={
                  isScrolled
                    ? "/logos/acm-blue-logo.png"
                    : "/logos/logo-full-white.png"
                }
                alt="ACM INSAT Logo"
                fill
                className="object-contain"
              />
            </div>
            {isScrolled && (
              <div className="text-2xl font-bold">
                <span className="text-foreground drop-shadow-sm">ACM</span>{" "}
                <span
                  className={`${
                    isScrolled ? "text-primary" : "text-background"
                  } drop-shadow-sm transition-colors duration-300`}
                >
                  INSAT
                </span>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 mx-auto">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`hover:text-accent transition-all duration-300 font-medium drop-shadow-sm relative group px-3 py-2 rounded-lg hover:glass-accent ${
                  selectedNavItem === index
                    ? "text-accent"
                    : isScrolled
                    ? "text-foreground"
                    : "text-background"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {selectedNavItem === index && item.icon}
                  {item.name}
                </div>
                <span className="absolute -bottom-1 left-3 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-[calc(100%-24px)]"></span>
              </a>
            ))}
          </div>
          <Button
            className={`glass-button font-bold transition-all duration-300 hover:scale-105 ${
              isScrolled ? "text-primary" : "text-white"
            }`}
          >
            <UserRoundPlus />
            Join Us
          </Button>

          {/* Mobile Menu Button */}
          <div
            className={`md:hidden ${
              isScrolled ? "text-foreground" : "text-background"
            }`}
          >
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
          <div className="md:hidden glass border-t border-white/10 transition-all duration-300">
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
            </div>
            <div className="px-3 py-2">
              <Button className="w-full glass-button text-white font-medium">
                <UserRoundPlus />
                Join Us
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
