import NextAuth from 'next-auth'
import EmailProvider from "next-auth/providers/email";
export const authOptions = {
  // Configure one or more authentication providers
  // providers: [
  // EmailProvider({
  //   server: {
  //     host: 'smtp.example.com',
  //     port: 587,
  //     auth: {
  //         user: 'username',
  //         pass: 'password'
  //       }
  //     },
  //     from: 'noreply@example.com'
  //   }),
  // ],
  providers: [
  EmailProvider({
    server: process.env.EMAIL_SERVER,
    from: process.env.EMAIL_FROM,
    sendVerificationRequest({
      identifier: email,
      url,
      provider: { server, from },
    }) {
      /* your function */
    },
  }),
]
}
export default NextAuth(authOptions)