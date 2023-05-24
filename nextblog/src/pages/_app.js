import Head from "next/head";

import "@/styles/globals.css";
import Layout from "@/components/layout/layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial scale=1" />
        <link rel="icon" href="/getting-started-nextjs.png" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
