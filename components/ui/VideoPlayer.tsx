import { getVideoEmbedInfo } from '@/lib/videoEmbed';

export function VideoPlayer({
  url,
  title,
  autoPlay = false,
  className = 'aspect-video w-full bg-black',
}: {
  url: string;
  title: string;
  autoPlay?: boolean;
  className?: string;
}) {
  const embed = getVideoEmbedInfo(url);

  if (embed) {
    return (
      <iframe
        src={autoPlay ? `${embed.embedUrl}?autoplay=1&rel=0` : embed.embedUrl}
        title={title}
        className={className}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <video
      src={url}
      controls
      autoPlay={autoPlay}
      playsInline
      preload={autoPlay ? 'auto' : 'none'}
      className={`${className} object-cover`}
      aria-label={title}
    />
  );
}
