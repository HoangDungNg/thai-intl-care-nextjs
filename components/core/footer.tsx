"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, MapPin, Mail, ArrowRight } from "lucide-react";
import { Tiktok } from "@/assets/icons/tiktok";

const CONTACT = [
  {
    Icon: Instagram,
    href: "https://www.instagram.com/zuki.nguyen?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    Icon: Facebook,
    href: "https://www.facebook.com/thainguyen92s",
  },
  {
    Icon: Tiktok,
    href: "https://www.tiktok.com/@zukinguyen?is_from_webapp=1&sender_device=pc",
  },
];

export function Footer() {
  return (
    <footer className="bg-background sticky top-full overflow-hidden pt-24 pb-8">
      <div className="container mx-auto px-6">
        {/* CTA section */}
        <div className="bg-primary group relative mb-20 overflow-hidden rounded-3xl p-8 md:p-12 lg:p-16">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-110" />

          <div className="relative flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="text-center lg:text-left">
              <h2 className="text-brand-dark mb-4 font-serif text-3xl font-bold text-balance md:text-4xl">
                Sẵn Sàng Bắt Đầu?
              </h2>
              <p className="text-brand-dark/80 max-w-2xl">
                Chúng tôi luôn sẵn sàng lắng nghe và chia sẻ giải pháp phù hợp nhất để bạn an tâm
                trên hành trình chăm sóc và hoàn thiện bản thân.
              </p>
            </div>

            {/* Glowing CTA Button */}
            <Button
              size="lg"
              className="text-primary group/btn relative h-12.5 overflow-hidden bg-white px-8 whitespace-nowrap shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/90 hover:shadow-xl"
              asChild
            >
              <a
                href="https://www.facebook.com/thainguyen92s"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-brand-dark relative z-10 flex items-center">
                  Bắt Đầu Hành Trình <br />
                  Đúng Cách Ngay
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </span>
              </a>
            </Button>
          </div>
        </div>

        {/* Footer Content */}
        <div className="mb-16 grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-6 inline-block">
              <span className="text-foreground font-serif text-2xl font-bold">
                Thai Intl <span className="text-primary">Care</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Bạn không chỉ cần một ca phẫu thuật - bạn cần một người đồng hành biết rõ toàn bộ hành
              trình.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground mb-6 font-semibold">Hành Trình - Giải Pháp</h4>
            <ul className="space-y-4">
              {[
                "Thủ thuật thẩm mỹ khuôn mặt",
                "Các liệu trình không phẫu thuật",
                "Phẩu thuật tái tạo",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary group inline-flex items-center text-sm transition-colors"
                  >
                    <span className="transition-transform group-hover:translate-x-1">
                      {service}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-foreground mb-6 font-semibold">
              Liên Hệ - Thái Nguyễn (Mr. Zuki Nguyen)
            </h4>
            <ul className="mb-8 space-y-4">
              <li className="group flex items-start gap-3">
                <MapPin className="text-primary mt-0.5 h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
                <span className="text-muted-foreground text-sm">
                  Ho Chi Minh city | Viet Nam | Bangkok | Thailand
                </span>
              </li>
              <li className="group flex items-center gap-3">
                <Mail className="text-primary h-5 w-5 shrink-0 transition-transform group-hover:scale-110" />
                <span className="text-muted-foreground text-sm">zukinguyen176@gmail.com</span>
              </li>
            </ul>

            <div className="mt-4 flex gap-3">
              {CONTACT.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary text-muted-foreground hover:bg-primary active:bg-primary flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-white active:scale-110 active:text-white"
                  aria-label={`Social media link ${index + 1}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Animated ECG Line Decoration */}
        <div className="relative mb-8 h-8 overflow-hidden">
          <svg viewBox="0 0 1200 30" className="h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ecg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Static ECG Pattern */}
            <path
              d="M0 15 L100 15 L110 15 L120 5 L130 25 L140 10 L150 20 L160 15 L250 15 L260 15 L270 5 L280 25 L290 10 L300 20 L310 15 L400 15 L410 15 L420 5 L430 25 L440 10 L450 20 L460 15 L550 15 L560 15 L570 5 L580 25 L590 10 L600 20 L610 15 L700 15 L710 15 L720 5 L730 25 L740 10 L750 20 L760 15 L850 15 L860 15 L870 5 L880 25 L890 10 L900 20 L910 15 L1000 15 L1010 15 L1020 5 L1030 25 L1040 10 L1050 20 L1060 15 L1150 15 L1160 15 L1170 5 L1180 25 L1190 10 L1200 15"
              fill="none"
              stroke="url(#ecg-gradient)"
              strokeWidth="2"
              className="opacity-30"
            />
          </svg>

          {/* Traveling Glow Dot */}
          <div className="bg-primary animate-dot-travel absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full blur-sm" />
        </div>

        {/* Bottom Bar */}
        <div className="border-border flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Thai Intl Care. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
