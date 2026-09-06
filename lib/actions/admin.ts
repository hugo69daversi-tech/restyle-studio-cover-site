'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { randomUUID } from 'crypto';
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase/server';

async function requireSession() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/admin/login');
  }
  return user;
}

function revalidateAll(path: string) {
  revalidatePath('/');
  revalidatePath(path);
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

// --- Hero ("Qui sommes-nous") ---
export async function updateHero(formData: FormData) {
  await requireSession();
  const admin = createSupabaseAdminClient();
  await admin
    .from('hero_content')
    .update({
      titre: formData.get('titre')?.toString() || '',
      devise: formData.get('devise')?.toString() || '',
      texte: formData.get('texte')?.toString() || '',
      updated_at: new Date().toISOString(),
    })
    .eq('id', 1);
  revalidateAll('/admin/contenu');
}

// --- Ligne actu ---
export async function updateLigneActu(formData: FormData) {
  await requireSession();
  const admin = createSupabaseAdminClient();
  await admin
    .from('ligne_actu')
    .update({
      texte: formData.get('texte')?.toString() || '',
      actif: formData.get('actif') === 'on',
      updated_at: new Date().toISOString(),
    })
    .eq('id', 1);
  revalidateAll('/admin/actu');
}

// --- Site settings ---
export async function updateSiteSettings(formData: FormData) {
  await requireSession();
  const admin = createSupabaseAdminClient();
  await admin
    .from('site_settings')
    .update({
      telephone: formData.get('telephone')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      zone_intervention: formData.get('zone_intervention')?.toString() || '',
      villes: formData.get('villes')?.toString() || '',
      horaires: formData.get('horaires')?.toString() || '',
      instagram_url: formData.get('instagram_url')?.toString() || '',
      facebook_url: formData.get('facebook_url')?.toString() || '',
      updated_at: new Date().toISOString(),
    })
    .eq('id', 1);
  revalidateAll('/admin/parametres');
}

export async function updateAvisConfig(formData: FormData) {
  await requireSession();
  const admin = createSupabaseAdminClient();
  await admin
    .from('site_settings')
    .update({
      avis_google_actif: formData.get('avis_google_actif') === 'on',
      avis_google_lien: formData.get('avis_google_lien')?.toString() || '',
      updated_at: new Date().toISOString(),
    })
    .eq('id', 1);
  revalidateAll('/admin/avis');
}

export async function updateCompteurConfig(formData: FormData) {
  await requireSession();
  const admin = createSupabaseAdminClient();
  await admin
    .from('site_settings')
    .update({
      compteur_actif: formData.get('compteur_actif') === 'on',
      compteur_valeur: Number(formData.get('compteur_valeur')) || 0,
      updated_at: new Date().toISOString(),
    })
    .eq('id', 1);
  revalidateAll('/admin/compteur');
}

// --- Upload media (helper) ---
async function uploadFileIfPresent(formData: FormData, field: string): Promise<string | null> {
  const file = formData.get(field);
  if (!(file instanceof File) || file.size === 0) return null;

  const admin = createSupabaseAdminClient();
  const ext = file.name.split('.').pop() || 'bin';
  const path = `${field}/${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await admin.storage.from('media').upload(path, buffer, {
    contentType: file.type || undefined,
    upsert: false,
  });
  if (error) throw error;

  const { data } = admin.storage.from('media').getPublicUrl(path);
  return data.publicUrl;
}

// --- Prestations ---
export async function upsertPrestation(formData: FormData) {
  await requireSession();
  const admin = createSupabaseAdminClient();
  const id = formData.get('id')?.toString();

  const payload = {
    titre: formData.get('titre')?.toString() || '',
    description: formData.get('description')?.toString() || '',
    icone: formData.get('icone')?.toString() || 'sparkles',
    ordre: Number(formData.get('ordre')) || 0,
    publie: formData.get('publie') === 'on',
  };

  if (id) {
    await admin.from('prestations').update(payload).eq('id', id);
  } else {
    await admin.from('prestations').insert(payload);
  }
  revalidateAll('/admin/prestations');
}

export async function deletePrestation(formData: FormData) {
  await requireSession();
  const admin = createSupabaseAdminClient();
  await admin.from('prestations').delete().eq('id', formData.get('id')?.toString());
  revalidateAll('/admin/prestations');
}

// --- Realisations photos ---
export async function upsertRealisationPhoto(formData: FormData) {
  await requireSession();
  const admin = createSupabaseAdminClient();
  const id = formData.get('id')?.toString();

  const photoAvantUrl = await uploadFileIfPresent(formData, 'photo_avant');
  const photoApresUrl = await uploadFileIfPresent(formData, 'photo_apres');

  const payload: Record<string, unknown> = {
    titre: formData.get('titre')?.toString() || '',
    texte_alt: formData.get('texte_alt')?.toString() || '',
    ordre: Number(formData.get('ordre')) || 0,
    publie: formData.get('publie') === 'on',
  };
  if (photoAvantUrl) payload.photo_avant_url = photoAvantUrl;
  if (photoApresUrl) payload.photo_apres_url = photoApresUrl;

  if (id) {
    await admin.from('realisations_photos').update(payload).eq('id', id);
  } else {
    if (!photoAvantUrl || !photoApresUrl) {
      throw new Error('Les deux photos (avant et après) sont requises pour une nouvelle réalisation.');
    }
    await admin.from('realisations_photos').insert(payload);
  }
  revalidateAll('/admin/realisations-photos');
}

export async function deleteRealisationPhoto(formData: FormData) {
  await requireSession();
  const admin = createSupabaseAdminClient();
  await admin.from('realisations_photos').delete().eq('id', formData.get('id')?.toString());
  revalidateAll('/admin/realisations-photos');
}

// --- Realisations videos ---
export async function upsertRealisationVideo(formData: FormData) {
  await requireSession();
  const admin = createSupabaseAdminClient();
  const id = formData.get('id')?.toString();

  const videoUrl = await uploadFileIfPresent(formData, 'video');
  const externalUrl = formData.get('video_url_externe')?.toString();

  const payload: Record<string, unknown> = {
    titre: formData.get('titre')?.toString() || '',
    texte_alt: formData.get('texte_alt')?.toString() || '',
    ordre: Number(formData.get('ordre')) || 0,
    publie: formData.get('publie') === 'on',
  };
  if (videoUrl) payload.video_url = videoUrl;
  else if (externalUrl) payload.video_url = externalUrl;

  if (id) {
    await admin.from('realisations_videos').update(payload).eq('id', id);
  } else {
    if (!payload.video_url) {
      throw new Error('Une vidéo (fichier ou lien) est requise.');
    }
    await admin.from('realisations_videos').insert(payload);
  }
  revalidateAll('/admin/realisations-videos');
}

export async function deleteRealisationVideo(formData: FormData) {
  await requireSession();
  const admin = createSupabaseAdminClient();
  await admin.from('realisations_videos').delete().eq('id', formData.get('id')?.toString());
  revalidateAll('/admin/realisations-videos');
}

// --- FAQ ---
export async function upsertFaq(formData: FormData) {
  await requireSession();
  const admin = createSupabaseAdminClient();
  const id = formData.get('id')?.toString();

  const payload = {
    question: formData.get('question')?.toString() || '',
    reponse: formData.get('reponse')?.toString() || '',
    ordre: Number(formData.get('ordre')) || 0,
    publie: formData.get('publie') === 'on',
  };

  if (id) {
    await admin.from('faq').update(payload).eq('id', id);
  } else {
    await admin.from('faq').insert(payload);
  }
  revalidateAll('/admin/faq');
}

export async function deleteFaq(formData: FormData) {
  await requireSession();
  const admin = createSupabaseAdminClient();
  await admin.from('faq').delete().eq('id', formData.get('id')?.toString());
  revalidateAll('/admin/faq');
}
