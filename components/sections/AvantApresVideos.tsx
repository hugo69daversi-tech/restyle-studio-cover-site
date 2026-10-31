'use client';

import { useEffect, useRef, useState } from 'react';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { getAutoplayEmbedUrl, getEmbedThumbnail, getVideoEmbedInfo } from '@/lib/videoEmbed';
import type { RealisationVideo } from '@/lib/types';

// Nombre minimum de cartes par serie pour que la boucle couvre un grand ecran sans trou.
const MIN_CARDS_PER_SET = 6;
const SECONDS_PER_CARD = 7;

/**
 * Carte qui ne charge et ne lit sa video que lorsqu'elle est a l'ecran :
 * le carrousel duplique les videos pour boucler, on evite ainsi de lire
 * une dizaine de videos en meme temps.
 */
function VideoCard({ video, onOpen }: { video: RealisationVideo; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const embed = getVideoEmbedInfo(video.video_url);
  const thumbnail = embed ? getEmbedThumbnail(embed) : null;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '0px 200px',
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (visible) el.play().catch(() => {});
    else el.pause();
  }, [visible]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      className="card group/card relative w-56 shrink-0 overflow-hidden p-0 text-left md:w-64"
      aria-label={`Voir la vidéo : ${video.titre}`}
    >
      <div className="relative aspect-[9/16] w-full bg-black">
        {thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumbnail} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        )}
        {embed
          ? visible && (
              <iframe
                src={getAutoplayEmbedUrl(embed)}
                title={video.texte_alt || video.titre}
                allow="autoplay; encrypted-media; picture-in-picture"
                className="pointer-events-none absolute inset-0 h-full w-full scale-[1.35]"
                tabIndex={-1}
              />
            )
          : (
              <video
                ref={videoRef}
                src={video.video_url}
                muted
                loop
                playsInline
                preload={visible ? 'auto' : 'none'}
                className="absolute inset-0 h-full w-full object-cover"
                aria-hidden
              />
            )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 pt-16">
          <p className="line-clamp-2 text-sm font-semibold">{video.titre}</p>
          <p className="mt-1 text-xs text-brand-cream/60 group-hover/card:text-brand-cream">▶ Voir avec le son</p>
        </div>
      </div>
    </button>
  );
}

export function AvantApresVideos({ videos }: { videos: RealisationVideo[] }) {
  const [selected, setSelected] = useState<RealisationVideo | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  if (videos.length === 0) return null;

  const repeat = Math.ceil(MIN_CARDS_PER_SET / videos.length);
  const set = Array.from({ length: repeat }, () => videos).flat();
  const track = [...set, ...set];

  return (
    <section className="py-20 md:py-28">
      <h2 className="mx-auto max-w-6xl px-6 text-center text-3xl font-bold md:text-4xl">
        Nos <span className="text-gradient">vidéos</span> avant / après
      </h2>

      <div className="group relative mt-12 overflow-hidden motion-reduce:overflow-x-auto">
        <div
          className="flex w-max gap-6 px-3 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ ['--marquee-duration' as string]: `${set.length * SECONDS_PER_CARD}s` }}
        >
          {track.map((video, i) => (
            <VideoCard key={`${video.id}-${i}`} video={video} onOpen={() => setSelected(video)} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-brand-bg to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-brand-bg to-transparent md:w-24" />
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.titre}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div className="flex max-h-full w-full max-w-sm flex-col" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mb-3 self-end rounded-full border border-white/20 px-3 py-1 text-sm"
            >
              Fermer ✕
            </button>
            <VideoPlayer
              url={selected.video_url}
              title={selected.texte_alt || selected.titre}
              autoPlay
              className="aspect-[9/16] max-h-[75dvh] w-full rounded-2xl bg-black"
            />
            <p className="mt-3 max-h-32 overflow-y-auto text-sm text-brand-cream/80">{selected.titre}</p>
          </div>
        </div>
      )}
    </section>
  );
}
