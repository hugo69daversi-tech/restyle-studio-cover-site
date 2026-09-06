import nodemailer from 'nodemailer';

export interface ContactSubmission {
  nom: string;
  adresse?: string;
  telephone?: string;
  email?: string;
  creneau?: string;
  message?: string;
}

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
    from: `"Site ReStyle Studio Cover" <${process.env.GMAIL_USER}>`,
    to: recipients.join(','),
    replyTo: data.email || undefined,
    subject: `Nouvelle demande de contact - ${data.nom}`,
    text: lignes.join('\n'),
    html: `<h2>Nouvelle demande depuis le site</h2><ul>${lignes
      .map((l) => `<li>${l}</li>`)
      .join('')}</ul>`,
  });
}
