import NextAuth from "next-auth"; //when using 'next-auth', the file needs to be set up as a dynamic 'catch-all' route to accomodate next-auth's built-in routes
import CredentialsProvider from "next-auth/providers/credentials";

import { connectToDatabase } from "../../../../lib/db";
import { verifyPassword } from "../../../../lib/auth";

// export const authOptions = {
//   //   credentials: {},       //credentials prop can be used to specify fields if using the next-auth's sign in page
//   //session is not necessary here because 'jwt' is default
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         const client = await connectToDatabase();

//         const usersCollection = client.db().collection("users");

//         const user = await usersCollection.findOne({
//           email: credentials.email,
//         });

//         if (!user) {
//           client.close();
//           throw new Error("No user found.");
//         }

//         const isValid = await verifyPassword(
//           credentials.password,
//           user.password
//         );

//         if (!isValid) {
//           client.close();
//           throw new Error("Could not log you in.");
//         }

//         client.close();
//         return { email: user.email };
//       },
//     }),
//   ],
// };

export default NextAuth({
  //   credentials: {},       //credentials prop can be used to specify fields if using the next-auth's sign in page
  //session is not necessary here because 'jwt' is default
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found.");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in.");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
  // secret: "supersecretkey",
});
