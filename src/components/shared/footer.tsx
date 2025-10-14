import { Button } from "@/components/shared/ui/button";
import { Facebook, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Activities", href: "#activities" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
    { name: "Join Us", href: "#join" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/insatacm",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/acm_insat_sc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/insatacm/",
      icon: Linkedin,
    },
  ];

  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 relative">
                <Image
                  src="/shapes/acm-shape-1.svg"
                  alt="ACM INSAT Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-xl font-bold">
                ACM <span className="text-sidebar-primary">INSAT</span>
              </div>
            </div>
            <p className="text-sidebar-foreground/80 mb-6 text-pretty leading-relaxed max-w-md">
              Empowering the next generation of innovators through competitive
              programming, AI, web development, and cloud computing education.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="outline"
                  size="icon"
                  className="border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground bg-transparent"
                  asChild
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sidebar-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sidebar-foreground/80 hover:text-sidebar-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-sidebar-foreground mb-4">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-sidebar-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sidebar-foreground/80 text-sm">
                    acm@insat.ucar.tn
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-sidebar-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sidebar-foreground/80 text-sm text-pretty">
                    676 INSAT Centre Urbain Nord BP
                    <br />
                    Tunis Cedex 1080, Tunisia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sidebar-border mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sidebar-foreground/60 text-sm">
              © 2025 ACM INSAT Student Chapter. All rights reserved.
            </p>
            <p className="text-sidebar-foreground/60 text-sm mt-2 sm:mt-0">
              Built with ❤️ by ACM INSAT Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
