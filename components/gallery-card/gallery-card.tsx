type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

const GalleryCard = ({ image }: { image: GalleryImage }) => {
  return (
    <figure
      role="listitem"
      className={[
        "shrink-0",
        "w-56 sm:w-64 md:w-72",
        // Variable heights for visual rhythm (portrait)
        "group relative overflow-hidden rounded-2xl",
        "shadow-md hover:shadow-xl",
        "transition-transform duration-500 ease-out",
        "hover:-translate-y-2 hover:scale-[1.02]",
        "focus-within:ring-2 focus-within:ring-stone-500",
        "cursor-pointer",
      ].join(" ")}
      style={{ height: "clamp(320px, 40vw, 420px)" }}
    >
      <img
        src={image.src}
        alt={image.alt}
        draggable={false}
        loading="lazy"
        decoding="async"
        className={[
          "h-full w-full object-cover",
          "transition-transform duration-700 ease-out",
          "group-hover:scale-105",
        ].join(" ")}
      />

      {/* Caption overlay */}
      <figcaption
        className={[
          "absolute right-0 bottom-0 left-0",
          "bg-linear-to-t from-black/50 to-transparent",
          "px-4 py-5",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-300",
        ].join(" ")}
      >
        <p className="text-sm leading-snug font-light tracking-wide text-white">{image.alt}</p>
      </figcaption>
    </figure>
  );
};

export { type GalleryImage, GalleryCard };
