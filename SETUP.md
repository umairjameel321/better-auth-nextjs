# Environment Setup for Better Auth

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Database
DATABASE_URL="your_postgresql_connection_string"

# Better Auth
BETTER_AUTH_SECRET="your_secret_key_here"
BETTER_AUTH_URL="http://localhost:3000"

# Resend Email Service (for password reset emails)
RESEND_API_KEY="your_resend_api_key_here"
RESEND_FROM_EMAIL="no-reply@yourdomain.com"

# GitHub OAuth (for social login)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
```

## Setup Steps

### 1. Resend Configuration (for password reset emails)

1. Go to [Resend.com](https://resend.com) and create an account
2. Get your API key from the dashboard
3. Add your domain and verify it (or use their test domain for development)
4. Set the environment variables:
   - `RESEND_API_KEY`: Your Resend API key
   - `RESEND_FROM_EMAIL`: Must be from a verified domain (e.g., "no-reply@yourdomain.com")

### 2. GitHub OAuth Configuration

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App with:
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
3. Get your Client ID and Client Secret
4. Set the environment variables:
   - `GITHUB_CLIENT_ID`: Your GitHub OAuth Client ID
   - `GITHUB_CLIENT_SECRET`: Your GitHub OAuth Client Secret

### 3. Database Setup

Make sure your PostgreSQL database is running and the `DATABASE_URL` is correctly set.

### 4. Better Auth Configuration

- `BETTER_AUTH_SECRET`: Generate a random secret key (you can use `openssl rand -base64 32`)
- `BETTER_AUTH_URL`: Your app's URL (http://localhost:3000 for development)

## Troubleshooting Password Reset Emails

If you're not receiving password reset emails:

1. **Check the console logs** - The updated code will log detailed information
2. **Verify Resend setup** - Make sure your domain is verified in Resend
3. **Check spam folder** - Reset emails might go to spam
4. **Test with Resend's test domain** - For development, you can use their test domain
5. **Verify environment variables** - Make sure all required variables are set

## Testing

After setting up the environment variables:

1. Restart your development server
2. Try the password reset flow
3. Check the console for detailed logs
4. Check your email (including spam folder)
