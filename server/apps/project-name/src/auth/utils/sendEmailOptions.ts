export function sendEmailOptions(to: string, token: string) {
  return {
    to: to,
    from: process.env.USER_EMAIL,
    subject: 'Verify your account.',
    html: `<a href="${process.env.SERVER_ROOT_DOMAIN}auth/verify?token=${token}">Verify account</a>`,
  };
}
