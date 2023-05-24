import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory); //readdirSync reads all the contents synchronously, returns an array of file names
}

export function dropFileExtension(fileName) {
  return fileName.replace(/\.md$/, ""); //removes the file extension
}

export function getPostData(postIdentifier) {
  const postSlug = dropFileExtension(postIdentifier);
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8"); //'fileContent' will be a string
  const { data, content } = matter(fileContent); //'matter', (gray-matter), returns an object with two properties, 'data' contains the metadata as a javascript object, and the 'content' property contains the markdown text as a string

  const postData = {
    slug: postSlug,
    ...data,
    content: content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

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
