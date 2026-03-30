"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";

export default function ExpertiseSection() {
  const { isInView, ref: sectionRef } = useInView({ threshold: 0.1 });

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const element = sectionRef.current;
        const rect = element.getBoundingClientRect();
        const offset = (window.innerHeight - rect.top) * 0.3;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="bg-background relative overflow-hidden py-20 lg:py-32">
      {/* Decorative blurred elements */}
      <div className="bg-primary/10 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl" />
      <div className="bg-accent/10 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-1000 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-4 inline-block rounded-full px-4 py-2">
            <p className="text-primary text-sm font-medium tracking-wide uppercase">
              Chuẩn Mực Toàn Cầu
            </p>
          </div>
          <h2 className="text-foreground mb-4 text-3xl font-bold text-balance lg:text-5xl">
            Không Ngừng Hoàn Thiện Chuyên Môn
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-balance">
            Đội ngũ bác sĩ luôn cập nhật kỹ thuật tiên tiến thông qua các hội thảo quốc tế, nhằm
            mang đến kết quả tốt nhất cho khách hàng.
          </p>
        </div>

        {/* Main Layout - Wide image on top, two vertical below */}
        <div className="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Wide Hero Image - spans full width */}
          <div
            className={`transition-all duration-1000 lg:col-span-3 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="group relative h-64 overflow-hidden rounded-2xl sm:h-80 lg:h-96">
              <Image
                src="/images/workshop-1.jpg"
                alt="Surgeon at international aesthetic conference HSAPS 2025"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                <p className="text-sm font-semibold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Tham dự các hội nghị khoa học quốc tế{" "}
                </p>
              </div>
            </div>
          </div>

          {/* Left Vertical Image - Training */}
          <div
            className={`transition-all delay-100 duration-1000 lg:col-span-1 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="group relative h-96 min-h-96 overflow-hidden rounded-2xl lg:h-full">
              <Image
                src="/images/workshop-2.jpg"
                alt="Surgeon presenting at international conference"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                <h3 className="mb-1 text-base font-semibold">Diễn Đàn Y Khoa Quốc Tế</h3>
                <p className="text-xs text-white/80">Kết nối và mở rộng chuyên môn</p>
              </div>
            </div>
          </div>

          <div
            className={`transition-all delay-200 duration-1000 lg:col-span-1 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="group relative h-96 min-h-96 overflow-hidden rounded-2xl lg:h-full">
              <Image
                src="/images/workshop-3.jpg"
                alt="Surgical team performing advanced procedure"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                <h3 className="mb-1 text-base font-semibold">Hội Thảo Thẩm Mỹ</h3>
                <p className="text-xs text-white/80">Trao đổi và chia sẻ kiến thức về thẩm mỹ</p>
              </div>
            </div>
          </div>

          {/* Right Vertical Image - Execution */}
          <div
            className={`transition-all delay-200 duration-1000 lg:col-span-1 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="group relative h-96 min-h-96 overflow-hidden rounded-2xl lg:h-full">
              <Image
                src="/images/workshop-4.jpg"
                alt="Surgical team performing advanced procedure"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                <h3 className="mb-1 text-base font-semibold">Thực Hiện Bởi Chuyên Gia</h3>
                <p className="text-xs text-white/80">Kỹ thuật được áp dụng với độ chính xác cao</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              label:
                "Bạn không còn phải mơ hồ khi đứng trước hàng loạt lựa chọn về bác sĩ và phương pháp, hậu phẫu, chăm sóc",
              delay: 0,
            },
            {
              label:
                "Không chọn theo xu hướng số đông - mà lựa chọn những gì thẩm mỹ nhất để hoàn thiện cho bệnh nhân",
              delay: 100,
            },
            {
              label:
                "Đạt kết quả tối ưu, đồng thời hạn chế tối đa rủi ro không cần thiết. Bạn không cần biết quá nhiều - chỉ cần được định hướng đúng",
              delay: 200,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`border-border/50 bg-card/50 rounded-xl border p-6 text-center backdrop-blur transition-all duration-1000 ${
                isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${stat.delay}ms` }}
            >
              {/* <div className="text-primary mb-2 text-3xl font-bold lg:text-4xl">{stat.number}</div> */}
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
