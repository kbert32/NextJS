import Head from "next/head";

import Layout from "@/components/layout/layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="NextJS Events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

//styles could be used in this file to set them up globally
//this is more or less our 'root' component
//'Layout' contains our navigation so it is wrapped around the entire project
