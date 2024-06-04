export function sendEmailOptions(to: string) {
  return {
    to: to,
    from: process.env.USER_EMAIL,
    subject: 'Attest your email to continue',
    html: "<div>I'll generate email here in future</div>",
  };
}
