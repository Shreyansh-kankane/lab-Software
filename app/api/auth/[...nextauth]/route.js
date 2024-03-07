import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { connectToDB } from "@/lib/utils";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { Email, Password } = credentials;
                try {
                    await connectToDB();
                    const user = await User.findOne({ email: Email });
                    if (!user) {
                        return null;
                    }
                    if(user.password === Password){
                        return user;
                    }
                    return null;
                } catch (error) {
                    console.log("Error: ", error);
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user._id;
                token.role = user.Role;
                token.email = user.email;
                token.name = user.Name;
            }
            return token;
        },
        async session({session, token}) {
            if(session.user){
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
        }
    }
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
