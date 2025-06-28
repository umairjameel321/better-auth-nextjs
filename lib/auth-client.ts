import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

export const authClient = createAuthClient({
  //you can pass client configuration here
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
