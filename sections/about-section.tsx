"use client";

import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";
import { Check } from "lucide-react";
import { AnimatedCounter } from "@/components/common/animated-counter";

export function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const features = [
    "Đồng hành, kết nối đội ngũ bác sĩ chuyên môn cao phù hợp với tình trạng cá nhân",
    "Chăm sóc, theo sát từng giai đoạn trước - trong - sau phẫu thuật",
    "Dịch vụ hỗ trợ cá nhân hóa 1:1 xuyên suốt hành trình thẫm mỹ",
    "Hướng dẫn chăm sóc hậu phẫu chuẩn, hạn chế rủi ro, làm đẹp vết mổ, hoàn thiện tốt nhất",
  ];

  return (
    <section id="about" className="bg-background relative overflow-hidden py-24 md:py-32">
      {/* Decorative Floating Elements */}
      <div className="bg-primary/5 absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full blur-3xl" />
      <div className="bg-primary/5 absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full blur-3xl" />

      <div ref={ref} className="container mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image Side */}
          <div
            className={`relative transform transition-all duration-1000 ${
              isInView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="relative">
              {/* Main Image with Hover Effect */}
              <div className="group relative aspect-4/5 overflow-hidden rounded-2xl">
                <Image
                  src="/images/surgeons-team.jpg"
                  alt="Our clinic interior"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="from-primary/20 absolute inset-0 bg-linear-to-t to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* Floating Card with Animation */}
              <div className="bg-card border-border absolute -right-8 -bottom-8 max-w-xs transform rounded-2xl border p-6 shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 relative flex h-14 w-14 items-center justify-center rounded-full">
                    <span className="text-primary text-2xl font-bold">
                      <AnimatedCounter end={5} isInView={isInView} />
                    </span>
                    <div className="border-primary/30 absolute inset-0 animate-ping rounded-full border-2" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm">Năm Vì</div>
                    <div className="text-foreground font-semibold">Khách Hàng</div>
                  </div>
                </div>
              </div>

              {/* Decorative Border with Animation */}
              <div className="border-primary/20 hover:border-primary/40 absolute -top-4 -left-4 -z-10 h-full w-full rounded-2xl border-2 transition-all duration-500" />

              {/* Additional Stats Card */}
              <div className="bg-primary absolute -top-6 -right-4 hidden transform rounded-xl p-4 text-white shadow-lg transition-transform hover:scale-105 md:block">
                <div className="text-brand-dark text-2xl font-bold">
                  <AnimatedCounter end={100} suffix="+" isInView={isInView} />
                </div>
                <div className="text-brand-dark/80 text-xs">Khách Hàng Tin Tưởng</div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`transform transition-all delay-300 duration-1000 ${
              isInView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <span className="text-primary text-sm font-medium tracking-widest uppercase">
              Về Chúng Tôi
            </span>

            <h2 className="text-foreground mt-4 mb-6 text-3xl leading-tight font-bold text-balance md:text-4xl lg:text-5xl">
              Người Đứng Sau Hành Trình Của Bạn
            </h2>

            <p className="text-muted-foreground mb-6 text-base leading-relaxed lg:text-lg">
              Thái Nguyễn (Zuki Nguyễn) – người sáng lập THAI INTL CARE, là người đã trực tiếp trải
              qua nhiều ca phẫu thuật lớn nhỏ để hoàn thiện chính mình.
            </p>

            <p className="text-muted-foreground mb-8 text-base leading-relaxed lg:text-lg">
              Từ phẫu thuật cắt ngực (Top Surgery), đến phẫu thuật cắt tử cung (Hysterectomy) một
              trong những hành trình hiếm khi được chia sẻ công khai trong cộng đồng chuyển giới nam
              tại Việt Nam - cho đến các can thiệp thẩm mỹ cơ thể và gương mặt, mỗi trải nghiệm đều
              mang lại sự thấu hiểu sâu sắc về tâm lý, thể trạng và quá trình hồi phục sau phẫu
              thuật.
            </p>

            <p className="text-muted-foreground mb-8 text-base leading-relaxed lg:text-lg">
              Không chỉ dừng lại ở trải nghiệm cá nhân, Zuki Nguyễn đã trực tiếp đồng hành và chăm
              sóc hơn 100+ ca phẫu thuật thẩm mỹ và bệnh lý, từ những ca đơn giản đến phức tạp.
            </p>

            <p className="text-muted-foreground mb-8 text-base leading-relaxed lg:text-lg">
              Với vai trò là người theo sát khách hàng xuyên suốt quá trình, từ chuẩn bị trước phẫu
              thuật đến giai đoạn hồi phục, Thái hiểu rõ: Một ca phẫu thuật thành công không chỉ nằm
              trên bàn mổ - mà nằm ở toàn bộ quá trình trước và sau đó.
            </p>

            {/* Features List with Staggered Animation */}
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li
                  key={feature}
                  className={`group flex transform items-center gap-3 transition-all duration-500 ${
                    isInView ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <div className="bg-primary/10 group-hover:bg-primary/20 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-all group-hover:scale-110">
                    <Check className="text-primary h-4 w-4" />
                  </div>
                  <span className="text-foreground group-hover:text-primary font-medium transition-colors">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
