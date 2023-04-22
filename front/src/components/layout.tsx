import Link from "next/link";
import Image from "next/image";

export default function Layout({ children }: any) {
  return (
    <>
    {children}
    <footer className='max-w-screen-lg mx-auto px-4 mt-24 mb-4 flex space-x-4 text-gray-400'>
      <div className="basis-1/2">
        <Link href="/">Home</Link> | <Link href="/posts/">Blog</Link>
      </div>
      <div className="basis-1/2 flex justify-end space-x-4">
        <Link href='https://gitlab.com/shimpeko'><Image src='/gitlab_icon.svg' alt='Gitlab' width={16} height={16} /></Link>
        <Link href='https://github.com/shimpeko'><Image src='/github_icon.svg' alt='Github' width={16} height={16} /></Link>
        <Link href='https://twitter.com/shimpeikodama'><Image src='/twitter_icon.svg' alt='Twitter' width={16} height={16} /></Link>
        <Link href='https://www.linkedin.com/in/shimpeko/'><Image src='/linkedin_icon.svg' alt='LinkedIn' width={16} height={16} /></Link>
      </div>
    </footer>
    </>
  );
}
