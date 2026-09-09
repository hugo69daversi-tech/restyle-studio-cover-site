import { getVideoEmbedInfo } from '@/lib/videoEmbed';

export function VideoPlayer({
  url,
  title,
  className = 'aspect-video w-full bg-black',
}: {
  url: string;
  title: string;
  className?: string;
}) {
  const embed = getVideoEmbedInfo(url);

  if (embed) {
    return (
      <iframe
        src={embed.embedUrl}
        title={title}
        className={className}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return <video src={url} controls preload="none" className={`${className} object-cover`} aria-label={title} />;
}
