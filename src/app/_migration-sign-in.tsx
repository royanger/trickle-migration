'use client'

import { useSignIn } from "@clerk/nextjs"


export const MigrationSignIn = async ({ token }: { token: string }) => {

  const { signIn, setActive } = useSignIn()

  if (!signIn || !setActive) return null

  const res = await signIn.create({
    strategy: "ticket",
    ticket: token
  })

  try {
    setActive({
      session: res.createdSessionId,
    })
  } catch (error) {
    console.log('Error:', error)
  }

  return null
}
