import type { RealisationVideo } from '@/lib/types';

export function AvantApresVideos({ videos }: { videos: RealisationVideo[] }) {
  if (videos.length === 0) return null;

  return (
    <section className="section-container">
      <h2 className="text-center text-3xl font-bold md:text-4xl">
        Nos <span className="text-gradient">vidéos</span> avant / après
      </h2>
      <div className="mt-12 flex gap-6 overflow-x-auto pb-4">
        {videos.map((video) => (
          <div key={video.id} className="card w-80 shrink-0 p-0 overflow-hidden">
            <video
              src={video.video_url}
              controls
              preload="none"
              className="aspect-video w-full bg-black object-cover"
              aria-label={video.texte_alt || video.titre}
            />
            <div className="p-4">
              <h3 className="font-semibold">{video.titre}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
