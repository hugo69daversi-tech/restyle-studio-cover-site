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
