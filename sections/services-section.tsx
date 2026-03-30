"use client";

import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { Sparkles, Syringe, Stethoscope } from "lucide-react";
import { AnimatedCounter } from "@/components/common/animated-counter";

const services = [
  {
    icon: Sparkles,
    title: "Phòng điều trị hiện đại",
    description:
      "Không gian điều trị sạch sẽ, tiện nghi với trang thiết bị y khoa hiện đại, mang đến sự thoải mái và an tâm cho khách hàng trong suốt quá trình nghỉ ngơi và hồi phục.",
    image: "/images/giuong-dich-vu.png",
  },
  {
    icon: Syringe,
    title: "Giải pháp theo thể trạng",
    description:
      "Sau khi trực tiếp trải qua nhiều ca phẫu thuật lớn nhỏ và đồng hành cùng đội ngũ các bác sĩ tạo hình giàu kinh nghiệm, tôi hiểu rằng:\n\nKhông có một phương pháp nào là tốt nhất - chỉ có phương pháp phù hợp nhất với từng cơ thể.\nMỗi khách hàng là một thể trạng khác nhau, từ cấu trúc cơ thể, nền tảng sức khỏe cho đến mục tiêu thẩm mỹ - đều cần được đánh giá và lựa chọn hướng can thiệp riêng biệt.",
    image: "/images/phuong-phap.jpg",
  },
  {
    icon: Stethoscope,
    title: "Chăm sóc toàn diện",
    description:
      "Dịch vụ chăm sóc tận tâm từ đội ngũ điều dưỡng, luôn đồng hành và hỗ trợ chu đáo từ sinh hoạt hằng ngày đến theo dõi sức khỏe, mang lại sự thoải mái và an tâm trong suốt quá trình hồi phục.",
    image: "/images/cham-soc.png",
  },
];

function ServiceCard({
  service,
  isInView,
}: {
  service: (typeof services)[0];
  index: number;
  isInView: boolean;
}) {
  return (
    <div
      className={`group bg-card border-border hover:border-primary/30 relative h-full transform cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {/* Image */}
      <div className="relative h-87.5 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-foreground group-hover:text-primary mb-3 text-xl font-semibold transition-colors">
          {service.title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
          {service.description}
        </p>
      </div>

      {/* 3D Shadow Effect */}
      <div className="from-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Bottom Glow */}
      <div className="via-primary absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}

export function ServicesSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="services" className="bg-background relative overflow-hidden py-24 md:py-32">
      {/* Animated Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <svg className="h-full w-full" preserveAspectRatio="none">
          <pattern
            id="services-pattern"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="30" cy="30" r="1" fill="currentColor" className="text-primary/20" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#services-pattern)" />
        </svg>
      </div>

      <div ref={ref} className="relative container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span
            className={`text-primary mb-4 inline-block transform text-sm font-medium tracking-widest uppercase transition-all duration-700 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            Dịch Vụ Của Chúng Tôi
          </span>
          <h2
            className={`text-foreground mb-6 transform text-3xl leading-tight font-bold text-balance transition-all delay-100 duration-700 md:text-4xl lg:text-5xl ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            Tinh Tế Trong Từng Trải Nghiệm
          </h2>
          <p
            className={`text-muted-foreground transform text-lg transition-all delay-200 duration-700 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            Chính sự kết hợp giữa trải nghiệm thực tế, kiến thức tích lũy và quá trình đồng hành
            cùng khách hàng đã giúp THAI INTL CARE trở thành lựa chọn đáng tin cậy cho những ai cần:
          </p>

          <div
            className={`flex transform justify-center transition-all delay-300 duration-700 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <ul className="text-muted-foreground mt-8 list-disc space-y-1 px-6 text-left text-base">
              <li>Một hệ thống hỗ trợ rõ ràng, cá nhân hóa</li>
              <li>Một người hiểu rõ hành trình họ sắp đi qua</li>
              <li>Một người luôn theo sát nhằm giảm thiểu rủi ro</li>
            </ul>
          </div>

          <p
            className={`text-muted-foreground mt-12 transform text-center text-base transition-all delay-400 duration-700 ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            Không chỉ là dịch vụ - mà là sự đồng hành từ người đã trải qua để bạn không phải tự mình
            đi qua hành trình này một cách mơ hồ.
          </p>
        </div>

        {/* Services Grid - 3D Tilt Cards */}
        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              className="h-full"
              key={service.title}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              <ServiceCard service={service} index={index} isInView={isInView} />
            </div>
          ))}
        </div>

        {/* Bottom Feature Bar with Animated Counters */}
        <div
          className={`mt-16 grid transform gap-6 transition-all delay-700 duration-700 sm:grid-cols-2 lg:grid-cols-4 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {[
            { value: 24, suffix: "/7", label: "Hỗ Trợ" },
            { value: 100, suffix: "%", label: "Ca Phẫu Thuật Thành Công" },
            { value: 100, suffix: "+", label: "Bệnh Nhân Trong và Ngoài Nước" },
            {
              value: 5,
              suffix: "-Star",
              label: "Dịch Vụ Đưa Đón Sân Bay\n - Ở Căn Hộ 5 Sao\n- Nấu Ăn Theo Yêu Cầus",
            },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card border-border hover:border-primary/30 group rounded-xl border p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-primary mb-1 text-2xl font-bold transition-transform group-hover:scale-110">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} isInView={isInView} />
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
