import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import { Pool } from "pg";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  database: new Pool({ connectionString: process.env.DATABASE_URL! }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      try {
        console.log("Attempting to send reset email to:", user.email);
        console.log("Reset URL:", url);
        console.log("From email:", process.env.RESEND_FROM_EMAIL);

        // Check if required environment variables are set
        if (!process.env.RESEND_API_KEY) {
          throw new Error("RESEND_API_KEY environment variable is not set");
        }
        if (!process.env.RESEND_FROM_EMAIL) {
          throw new Error("RESEND_FROM_EMAIL environment variable is not set");
        }

        const result = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!, // e.g. "no-reply@yourdomain.com"
          to: user.email,
          subject: "Reset Your Password",
          html: `
            <p>Hello ${user.name ?? user.email},</p>
            <p>You requested a password reset. Click the link below to set a new password. This link expires in 1 hour.</p>
            <p><a href="${url}" style="color: #2563EB;">Reset Password</a></p>
            <p>If you didn't request this, you can safely ignore this email.</p>
          `,
        });

        console.log("Email sent successfully:", result);
      } catch (error) {
        console.log("Failed to send reset email:", error);
        throw error; // Re-throw to let better-auth handle it
      }
    },
    resetPasswordTokenExpiresIn: 3600, // 1 hour
  },
  socialProviders: {
    // google: {
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()], // auto-set cookies on server actions
});
