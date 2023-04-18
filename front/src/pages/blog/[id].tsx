import { GetStaticPathsResult } from "next/types";
import { getAllPostIds, getPostData } from "../../lib/posts";

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
    <header className='max-w-screen-lg mx-auto flex'><div className='text-gray-400 mx-auto my-4 md:my-8'>shimpeko's note</div></header>
    <article className='max-w-screen-lg mx-auto px-4'>
      <h1 className='text-3xl md:text-4xl mt-8 md:mt-12 mb-2 md:mb-4 font-semibold'>{postData.title}</h1>
      <time className="block text-xs md:text-sm mb-8 md:mb-12 text-gray-400">{postData.published_time}</time>
      <div className='prose prose-base md:prose-lg' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
    </>
  );
}
