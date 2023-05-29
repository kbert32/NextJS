import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { PrismLight } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";

import PostHeader from "./post-header";
import classes from "./post-content.module.css";

PrismLight.registerLanguage("css", css); //registering only the languages we need, keeps the import file size lighter
PrismLight.registerLanguage("js", js);
PrismLight.registerLanguage("jsx", jsx);

export default function PostContent(props) {
  const { slug, image, title, content } = props.post;
  const imagePath = `/images/posts/${slug}/${image}`;

  const customRenderers = {
    // img(image) {
    //   return (
    //     <Image
    //       src={`/images/posts/${slug}/${image.src}`}
    //       alt={image.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },

    code(code) {
      const { className, children } = code;
      const language = className.split("-")[1]; //ReactMarkdown does not return a value that react-syntax-highlighter can directly use?

      return (
        <PrismLight style={atomDark} language={language}>
          {children}
        </PrismLight>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
    </article>
  );
}
