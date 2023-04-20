import { getAllPostIds, getPostData } from "@/lib/posts";
import Link from "next/link";

export async function getStaticProps({ params }: any) {
  const allPostData = await Promise.all(getAllPostIds().map(async (id) => (await getPostData(id))));
  return {
    props: {
      allPostData,
    },
  };
}

export default function BlogIndex({ allPostData }: any) {
  return (
    <>
      <header className="max-w-screen-md mx-auto flex">
        <div className="mx-auto my-6 md:my-8 text-3xl md:text-4xl">
          shimpeko's note
        </div>
      </header>
      <main className='mx-auto max-w-screen-md my-8 md:my-12 px-4 md:px-0'>
        {allPostData.map((postData: any) => (
          <article className="max-w-screen-lg mx-auto my-8 md:my-12">
            <time className="block text-xs md:text-sm mb-1 md:mb-2 text-gray-400">
              {postData.published_time}
            </time>
            <h1 className="text-2xl md:text-3xl mb-1 md:mb-2 font-semibold">
              <Link href={`blog/${postData.id}`}>{postData.title}</Link>
            </h1>
            <div>{postData.excerpt}</div>
          </article>
        ))}
      </main>
    </>
  );
}
