import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

function getPostData(fileName) {
  const filePath = path.join(postsDirectory, fileName);
  fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent); //'matter', (gray-matter), returns an object with two properties, 'data' contains the metadata as a javascript object, and the 'content' property contains the markdown text as a string

  const postSlug = fileName.replace(/\.md$/, ""); //removes the file extension

  const postData = {
    slug: postSlug,
    ...data,
    content: content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = fs.readdirSync(postsDirectory); //readdirSync reads all the contents synchronously

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}

//installed:

//npm install react-markdown  - converts markdown to JSX
//npm install gray-matter - allows us to read a markdown file and split it into metadata and the actual markdown content.
