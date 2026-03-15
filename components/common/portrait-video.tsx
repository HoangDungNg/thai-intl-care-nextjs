interface PortraitVideoProps {
  src: string;
}

export const PortraitVideo = ({ src }: PortraitVideoProps) => {
  return (
    <div className="mx-auto my-0 aspect-9/16 w-full max-w-90 overflow-hidden rounded-[12px]">
      <video
        autoPlay
        muted
        controls
        playsInline
        preload="metadata"
        className="h-full w-full object-contain"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
