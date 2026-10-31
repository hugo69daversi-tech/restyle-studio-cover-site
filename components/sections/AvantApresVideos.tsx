'use client';

import { useEffect, useRef, useState } from 'react';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getAutoplayEmbedUrl, getEmbedThumbnail, getVideoEmbedInfo } from '@/lib/videoEmbed';
import type { RealisationVideo } from '@/lib/types';

// Nombre minimum de cartes par serie pour que la boucle couvre un grand ecran sans trou.
const MIN_CARDS_PER_SET = 6;
const SECONDS_PER_CARD = 7;

/**
 * Carte video sans texte, qui ne charge et ne lit sa video que lorsqu'elle est
 * a l'ecran : le carrousel duplique les videos pour boucler, on evite ainsi de
 * lire une dizaine de videos en meme temps.
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
      className="group/card relative aspect-[9/16] w-52 shrink-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:-translate-y-2 hover:border-brand-pink/50 md:w-64"
      aria-label={`Voir la vidéo avec le son : ${video.texte_alt || video.titre}`}
    >
      {thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={thumbnail} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      )}
      {embed ? (
        visible && (
          <iframe
            src={getAutoplayEmbedUrl(embed)}
            title={video.texte_alt || video.titre}
            allow="autoplay; encrypted-media; picture-in-picture"
            className="pointer-events-none absolute inset-0 h-full w-full scale-[1.35]"
            tabIndex={-1}
          />
        )
      ) : (
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
      <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-sm opacity-0 backdrop-blur-md transition-opacity group-hover/card:opacity-100">
        🔊
      </span>
    </button>
  );
}

export function AvantApresVideos({ videos }: { videos: RealisationVideo[] }) {
  const [selected, setSelected] = useState<RealisationVideo | null>(null);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [selected]);

  if (videos.length === 0) return null;

  const repeat = Math.ceil(MIN_CARDS_PER_SET / videos.length);
  const set = Array.from({ length: repeat }, () => videos).flat();
  const track = [...set, ...set];

  return (
    <section className="overflow-hidden py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="En vidéo"
          titre="La transformation, en vrai."
          accent={[2, 3]}
          chapeau="Touchez une vidéo pour la voir en grand avec le son."
        />
      </div>

      {/* Mur de videos incline en perspective, qui defile en continu. */}
      <div className="mt-16 [perspective:1400px]">
        <div className="group relative -mx-10 [transform:rotateX(10deg)_rotateZ(-4deg)] motion-reduce:transform-none">
          <div
            className="flex w-max gap-5 py-6 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none md:gap-7"
            style={{ ['--marquee-duration' as string]: `${set.length * SECONDS_PER_CARD}s` }}
          >
            {track.map((video, i) => (
              <VideoCard key={`${video.id}-${i}`} video={video} onOpen={() => setSelected(video)} />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-bg to-transparent md:w-48" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-bg to-transparent md:w-48" />
        </div>
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.texte_alt || selected.titre}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
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
              className="aspect-[9/16] max-h-[80dvh] w-full rounded-[1.75rem] bg-black"
            />
          </div>
        </div>
      )}
    </section>
  );
}
