export interface VideoEmbedInfo {
  provider: 'youtube' | 'vimeo';
  embedUrl: string;
}

/**
 * Detecte si une URL video pointe vers YouTube ou Vimeo et renvoie l'URL
 * d'embed correspondante. Renvoie null pour un fichier video brut (Supabase
 * Storage, etc.), qui doit alors etre lu via une balise <video>.
 */
export function getVideoEmbedInfo(url: string): VideoEmbedInfo | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, '');

  if (host === 'youtu.be') {
    const id = parsed.pathname.slice(1).split('/')[0];
    if (id) return { provider: 'youtube', embedUrl: `https://www.youtube.com/embed/${id}` };
  }

  if (host === 'youtube.com' || host === 'm.youtube.com') {
    if (parsed.pathname === '/watch') {
      const id = parsed.searchParams.get('v');
      if (id) return { provider: 'youtube', embedUrl: `https://www.youtube.com/embed/${id}` };
    }
    const embedMatch = parsed.pathname.match(/^\/embed\/([^/?]+)/);
    if (embedMatch) return { provider: 'youtube', embedUrl: `https://www.youtube.com/embed/${embedMatch[1]}` };
    const shortsMatch = parsed.pathname.match(/^\/shorts\/([^/?]+)/);
    if (shortsMatch) return { provider: 'youtube', embedUrl: `https://www.youtube.com/embed/${shortsMatch[1]}` };
  }

  if (host === 'vimeo.com') {
    const match = parsed.pathname.match(/\/(\d+)/);
    if (match) return { provider: 'vimeo', embedUrl: `https://player.vimeo.com/video/${match[1]}` };
  }
  if (host === 'player.vimeo.com') {
    return { provider: 'vimeo', embedUrl: parsed.href };
  }

  return null;
}

/**
 * Variante muette, en boucle et sans controles, pour une lecture automatique
 * en arriere-plan (carrousel des videos). YouTube exige `playlist=<id>` pour boucler.
 */
export function getAutoplayEmbedUrl(info: VideoEmbedInfo): string {
  if (info.provider === 'vimeo') {
    const url = new URL(info.embedUrl);
    url.searchParams.set('background', '1');
    return url.href;
  }
  const id = info.embedUrl.split('/embed/')[1];
  return `${info.embedUrl}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&playsinline=1&rel=0&modestbranding=1`;
}

/** Miniature YouTube affichee avant le chargement du lecteur. */
export function getEmbedThumbnail(info: VideoEmbedInfo): string | null {
  if (info.provider !== 'youtube') return null;
  return `https://i.ytimg.com/vi/${info.embedUrl.split('/embed/')[1]}/hqdefault.jpg`;
}
