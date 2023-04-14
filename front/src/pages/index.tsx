import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>shimpeko (Shimpei Kodama)</title>
        <meta name="description" content="A little about shimpeko." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='max-w-screen-lg mx-auto px-0 md:px-4 lg:px-0 my-0 md:my-16'>
        <div className='aspect-video relative'>
        <Image
          src={`/lel_2022.webp`}
          fill
          alt="LEL 2022"
          className="object-cover md:rounded-md"
        />
        </div>
      </div>
      <main className="max-w-screen-lg mx-auto px-4 my-8 md:my-16">
        <h1 className='text-4xl my-8'>shimpeko (Shimpei Kodama)</h1>
        <div>
          Not only does he enjoy endurance sports including swimming, cycling,
          and running, but he also finds pleasure in creative activities such as
          cooking and programming.
        </div>
        <div className="my-8"><Link href='https://www.linkedin.com/in/shimpeko/'>CV (Linkedin)</Link></div>
      </main>
      <footer className='max-w-screen-lg mx-auto px-4 mb-8 flex justify-end space-x-4'>
        <Link href='https://gitlab.com/shimpeko'><Image src='/gitlab_icon.svg' alt='Gitlab' width={16} height={16} /></Link>
        <Link href='https://github.com/shimpeko'><Image src='/github_icon.svg' alt='Github' width={16} height={16} /></Link>
        <Link href='https://twitter.com/shimpeikodama'><Image src='/twitter_icon.svg' alt='Twitter' width={16} height={16} /></Link>
        <Link href='https://www.linkedin.com/in/shimpeko/'><Image src='/linkedin_icon.svg' alt='LinkedIn' width={16} height={16} /></Link>
      </footer>
    </>
  );
}
