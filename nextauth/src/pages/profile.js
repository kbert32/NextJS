// import { authOptions } from "./api/auth/[...nextauth]";
// import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";

import UserProfile from "../components/profile/user-profile";

export default function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  // const session = await getServerSession(context.req, context.res, authOptions); //'getServerSession' is recommended over 'getSession'
  //getServerSideProps and getServerSession are used here to redirect if not authorized to visit this page
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
