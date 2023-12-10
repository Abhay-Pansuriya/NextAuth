import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/User";
import connect from "@/Utils/db";
export const authOptions: any = {
    // Configure one or more authentication providers
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credential: any) {
                await connect();
                try {
                    const user = await User.findOne({ email: credential.email, password: credential.password });
                    if (user) { return user; }
                } catch (err: any) {
                    throw new Error(err)
                }

            }
        }),
        GithubProvider({
            clientId: "process.env.GITHUB_ID",
            clientSecret: "process.env.GITHUB_SECRET",
        }),
    ],
    callbacks: {
        async session({ session }: any) {
            const email = session?.user?.email;
            if (email) {
                await connect();
                const user: any = await User.findOne({ email }).lean();
                user.role = user.role || "user";
                session.user = { ...session.user, ...user }
            }
            return session
        }
    }
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }