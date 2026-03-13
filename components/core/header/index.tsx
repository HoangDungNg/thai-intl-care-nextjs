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

  // const navLinks = [
  //   { href: "#about", label: "About" },
  //   { href: "#services", label: "Services" },
  //   { href: "#doctors", label: "Our Doctors" },
  //   { href: "#testimonials", label: "Testimonials" },
  // ];

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-card/95 py-4 shadow-sm backdrop-blur-md" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-foreground font-serif text-2xl font-bold tracking-tight">
            Aesthé<span className="text-primary">tica</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        {/* <div className="hidden items-center gap-8 md:flex"> */}
        {/*   {navLinks.map((link) => ( */}
        {/*     <Link */}
        {/*       key={link.href} */}
        {/*       href={link.href} */}
        {/*       className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors duration-300" */}
        {/*     > */}
        {/*       {link.label} */}
        {/*     </Link> */}
        {/*   ))} */}
        {/* </div> */}

        <div className="hidden items-center gap-4 md:flex">
          <Link href="#" className="bg-primary rounded p-px">
            <Image src={"/icons/zalo-icon.png"} alt="" width={40} height={40} />
          </Link>
          {/* <Button */}
          {/*   variant="outline" */}
          {/*   className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300" */}
          {/* > */}
          {/*   Contact Us */}
          {/* </Button> */}
          {/* <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"> */}
          {/*   Book Appointment */}
          {/* </Button> */}
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
          {/* {navLinks.map((link) => ( */}
          {/*   <Link */}
          {/*     key={link.href} */}
          {/*     href={link.href} */}
          {/*     className="text-muted-foreground hover:text-primary py-2 text-sm font-medium transition-colors" */}
          {/*     onClick={() => setIsMobileMenuOpen(false)} */}
          {/*   > */}
          {/*     {link.label} */}
          {/*   </Link> */}
          {/* ))} */}
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
