import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDatabase } from "@utils/database";
import  User  from '@models/user'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({session}) {
            //get user from db
            const sessionUser = await User.findOne({
                email: session.user.email,
            })
    
            //set user id to session id
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
        async signIn({profile}) {
            try {
                //serverless route - lambda function that opens up only when called
                await connectToDatabase();
                //check if user aleready exists
                const userExists = await User.findOne({
                    email: profile.email,
                })
                
                //if not, create new user and save to db
                if(!userExists){
                    await User.create({
                        email: profile.email,
                        username : profile.name.replace(" ", "").toLowerCase(),
                        image: profile.image,
                    })
                }
                return true;
    
            } catch (error) {
                console.log(error);
            }
        },
    }

    

})

export { handler as GET , handler as POST}