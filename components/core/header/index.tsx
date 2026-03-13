"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.info({ isScrolled });
  }, [isScrolled]);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-card/95 py-4 shadow-sm backdrop-blur-md" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-foreground font-serif text-2xl font-bold tracking-tight">
            Thai Intl <span className="text-primary">Care</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="#"
            className="hover:border-b-primary rounded-sm border-b border-b-white transition-all hover:scale-[1.05] hover:shadow-sm"
          >
            <Image src={"/icons/zalo-icon.png"} alt="" width={40} height={40} />
          </Link>

          <Link
            href="#"
            className="hover:border-b-primary rounded-sm border-b border-b-white transition-all hover:scale-[1.05] hover:shadow-sm"
          >
            <Image src={"/icons/facebook-icon.png"} alt="" width={40} height={40} />
          </Link>

          <Link
            href="#"
            className="hover:border-b-primary rounded-sm border-b border-b-white transition-all hover:scale-[1.05] hover:shadow-sm"
          >
            <Image src={"/icons/instagram-icon.png"} alt="" width={40} height={40} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`bg-card/95 absolute top-full right-0 left-0 overflow-hidden backdrop-blur-md transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? "border-border max-h-96 border-b" : "max-h-0"
        }`}
      >
        <div className="container mx-auto flex flex-col gap-4 px-6 py-4">
          <div className="border-border flex flex-col gap-2 border-t pt-4">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full"
            >
              Contact Us
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full">
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
