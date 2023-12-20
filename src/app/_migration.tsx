import { getSession } from "@auth0/nextjs-auth0";
import { clerkClient } from "@clerk/nextjs";
import { MigrationSignIn } from "./_migration-sign-in";


const checkForAuth0 = async () => {

  const session = await getSession()

  // const res = NextResponse.next();
  // const session = await getSession(req, res);
  if (session) {
    console.log('AUTH0 User:', session)
    // Do what you want...

    const checkUser = await clerkClient.users.getUserList({ emailAddress: session.user.email })

    if (checkUser.length < 1) {

      const newUser = await clerkClient.users.createUser({
        firstName: session.user.given_name,
        lastName: session.user.family_name,
        username: session.user.nickname,
        emailAddress: [session.user.email_verified ? session.user.email : null],
        externalId: session.user.sub
      })

      try {
        const signInToken = await clerkClient.signInTokens.createSignInToken({ userId: newUser.id, expiresInSeconds: 600 })

        console.dir({ 'new user': newUser, 'signInToken': signInToken })

        return signInToken.token

      } catch (err) {
        console.log('ERROR:', err)
      }
    }
  }
  return null
}


export default async function Migration() {

  const token = await checkForAuth0()



  if (!token) return null

  return <MigrationSignIn token={token} />
}
