import { GetStaticPathsResult } from "next/types";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Link from "next/link";

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const paths = getAllPostIds().map((id) => ({ params: { id: id } }));
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }: any) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }: any) {
  return (
    <>
    <header className='max-w-screen-md mx-auto flex'><div className='mx-auto my-4 md:my-8'><Link href="/posts" className='text-gray-400 visited:text-gray-400 no-underline hover:underline hover:text-sky-800'>shimpeko's note</Link></div></header>
    <article className='max-w-screen-md mx-auto px-4'>
      <h1 className='text-3xl md:text-4xl mt-8 md:mt-12 mb-2 md:mb-4 font-semibold'>{postData.title}</h1>
      <time className="block text-xs md:text-sm mb-8 md:mb-12 text-gray-400">{postData.published_time}</time>
      <div className='prose prose-base md:prose-lg max-w-none' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
    </>
  );
}
