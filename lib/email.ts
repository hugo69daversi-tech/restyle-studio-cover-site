import nodemailer from 'nodemailer';

export interface ContactSubmission {
  nom: string;
  adresse?: string;
  telephone?: string;
  email?: string;
  creneau?: string;
  message?: string;
}

// Template de l'email de confirmation envoye au client juste apres l'envoi
// de sa demande. Regroupe sujet + corps ici pour etre facilement modifiable
// sans toucher a la logique d'envoi.
const CLIENT_CONFIRMATION_TEMPLATE = {
  subject: 'Votre demande a bien été reçue - ReStyle Studio',
  text: (nom: string) => `Bonjour ${nom},

Nous avons bien reçu votre demande de contact. Un commercial ReStyle Studio va vous recontacter prochainement, au créneau que vous avez choisi.

À très vite,
L'équipe ReStyle Studio`,
  html: (nom: string) => `
    <p>Bonjour ${nom},</p>
    <p>Nous avons bien reçu votre demande de contact. Un commercial <strong>ReStyle Studio</strong> va vous recontacter prochainement, au créneau que vous avez choisi.</p>
    <p>À très vite,<br />L'équipe ReStyle Studio</p>
  `,
};

function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export async function sendContactEmail(data: ContactSubmission) {
  const recipients = (process.env.CONTACT_RECIPIENTS || process.env.GMAIL_USER || '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    throw new Error('Aucun destinataire configure (CONTACT_RECIPIENTS)');
  }

  const transporter = getTransporter();

  const lignes = [
    `Nom / Prenom : ${data.nom}`,
    data.adresse ? `Adresse : ${data.adresse}` : null,
    data.telephone ? `Telephone : ${data.telephone}` : null,
    data.email ? `Email : ${data.email}` : null,
    data.creneau ? `Creneau de rappel prefere : ${data.creneau}` : null,
    data.message ? `Message : ${data.message}` : null,
  ].filter(Boolean);

  await transporter.sendMail({
    from: `"Site ReStyle Studio" <${process.env.GMAIL_USER}>`,
    to: recipients.join(','),
    replyTo: data.email || undefined,
    subject: `Nouvelle demande de contact - ${data.nom}`,
    text: lignes.join('\n'),
    html: `<h2>Nouvelle demande depuis le site</h2><ul>${lignes
      .map((l) => `<li>${l}</li>`)
      .join('')}</ul>`,
  });
}

/**
 * Email de confirmation envoye au client apres soumission du formulaire.
 * Silencieusement ignore si le client n'a laisse qu'un telephone (pas d'email).
 */
export async function sendClientConfirmationEmail(data: ContactSubmission) {
  if (!data.email) return;

  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"ReStyle Studio" <${process.env.GMAIL_USER}>`,
    to: data.email,
    subject: CLIENT_CONFIRMATION_TEMPLATE.subject,
    text: CLIENT_CONFIRMATION_TEMPLATE.text(data.nom),
    html: CLIENT_CONFIRMATION_TEMPLATE.html(data.nom),
  });
}
