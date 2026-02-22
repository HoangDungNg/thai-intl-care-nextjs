import { SLIDER_CONFIG } from "./config";

// export function cardTransform(offsetIndex: number) {
//   const { spreadDeg, radiusPx } = SLIDER_CONFIG;
//   const angleDeg = offsetIndex * spreadDeg;
//   const angleRad = (angleDeg * Math.PI) / 180;
//
//   // Circular displacement — this is what makes the motion arc, not slide
//   const x = Math.sin(angleRad) * radiusPx;
//   const y = (1 - Math.cos(angleRad)) * radiusPx; // 0 at centre, rises off-axis
//
//   const abs = Math.abs(offsetIndex);
//   const scale = abs === 0 ? 1 : Math.max(0.68, 1 - abs * 0.09);
//   const opacity = abs === 0 ? 1 : Math.max(0.3, 1 - abs * 0.22);
//   const zIndex = 100 - abs * 10;
//
//   return { rotate: angleDeg, x, y, scale, opacity, zIndex };
// }

type CardTransformParams = {
  offsetIndex: number;
  activeScale?: number;
  yOffset?: number;
};

export function cardTransform({
  offsetIndex,
  yOffset = 0,
  activeScale = 1,
}: CardTransformParams) {
  const { spreadDeg, radiusPx } = SLIDER_CONFIG;

  const baseRotate = -spreadDeg; // −21°
  const angleDeg = offsetIndex * spreadDeg + baseRotate;
  const angleRad = (angleDeg * Math.PI) / 180;

  const x = Math.sin(angleRad) * radiusPx;
  const y = (1 - Math.cos(angleRad)) * radiusPx + yOffset;

  const abs = Math.abs(offsetIndex);
  const scale = abs === 0 ? activeScale : Math.max(0.68, 1 - abs * 0.09);
  const opacity = abs === 0 ? 1 : 0.25;
  const zIndex = 100 - abs * 10;

  return { rotate: angleDeg, x, y, scale, opacity, zIndex };
}
