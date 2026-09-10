import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactEmail, sendClientConfirmationEmail } from '@/lib/email';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

const schema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  adresse: z.string().optional(),
  telephone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  creneau: z.string().optional(),
  message: z.string().optional(),
  consentement: z.union([z.literal('on'), z.literal('true'), z.boolean()]),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Formulaire invalide' }, { status: 400 });
  }

  const { nom, adresse, telephone, email, creneau, message } = parsed.data;

  if (!telephone && !email) {
    return NextResponse.json(
      { error: 'Merci de renseigner au moins un téléphone ou un email' },
      { status: 400 }
    );
  }

  try {
    await sendContactEmail({ nom, adresse, telephone, email, creneau, message });
  } catch (error) {
    console.error("Erreur d'envoi email contact:", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi de votre demande" }, { status: 500 });
  }

  try {
    await sendClientConfirmationEmail({ nom, adresse, telephone, email, creneau, message });
  } catch (error) {
    console.error('Erreur envoi email de confirmation client (non bloquant):', error);
  }

  try {
    const supabase = createSupabaseAdminClient();
    await supabase.from('contacts').insert({
      nom,
      adresse,
      telephone,
      email,
      creneau,
      message,
      consentement: true,
    });
  } catch (error) {
    console.error('Erreur sauvegarde contact (non bloquant):', error);
  }

  return NextResponse.json({ ok: true });
}
