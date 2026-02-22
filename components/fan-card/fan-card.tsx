import { Ref } from "react";

type FanCardData = {
  id: number;
  accent: string;
  label: string;
  img: string;
  text: string;
};

interface FanCardProps {
  card: FanCardData;
  ref: Ref<HTMLDivElement>;
  width: number;
}

const FanCard = ({ card, ref, width }: FanCardProps) => {
  const cardH = Math.round((width * 16) / 9);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        width,
        height: cardH,
        left: "50%",
        top: 0,
        marginLeft: width / 2,
        /* transformOrigin centre so rotation is around the card's own centre */
        transformOrigin: "50% 50%",
        willChange: "transform, opacity",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        // boxShadow: "0 12px 40px rgba(0,0,0,0.55)",
      }}
    >
      <img
        src={card.img}
        alt={card.label}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          pointerEvents: "none",
          userSelect: "none",
        }}
        draggable={false}
      />
      {/* Gradient label badge */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "28px 12px 10px",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 12,
          letterSpacing: "0.3em",
          color: card.accent,
        }}
      >
        {card.label}
      </div>
    </div>
  );
};

export { FanCard, type FanCardData };
