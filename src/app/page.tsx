import { UserButton } from "@clerk/nextjs";
import { Auth0Profile } from "./_auth0-profile";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <UserButton />
      <Auth0Profile />
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
    </main>
  )
}
