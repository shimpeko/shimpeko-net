import fs from "fs";
import path from "path";
import showdown from "showdown";
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPostIds(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ""));
}

export async function getPostData(id: string): Promise<object> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const converter = new showdown.Converter({
    metadata: true,
    headerLevelStart: 2,
    simpleLineBreaks: true,
    tables: true,
    strikethrough: true,
    ghCodeBlocks: true,
  });
  const contentHtml = converter.makeHtml(fileContents);
  const metadata = converter.getMetadata() as showdown.Metadata;

  const matterResult = matter(fileContents);

  let excerpt = matterResult.content.substring(0, 120);
  if (excerpt.length === 120) {
    excerpt += "...";
  }

  return {
    id,
    contentHtml,
    excerpt,
    ...metadata,
  };
}
