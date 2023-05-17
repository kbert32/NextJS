import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        {/* <div id='overlay' />     */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// the commented div could be added for something such as a portal or to setup a modal
//extra html elements added into this file would be outside of the component tree
