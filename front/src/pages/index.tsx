import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>shimpeko (Shimpei Kodama)</title>
        <meta name="description" content="A little about shimpeko." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='max-w-screen-lg mx-auto px-0 my-0 lg:my-4'>
        <div className='aspect-video relative'>
        <Image
          src={`/lel_2022.webp`}
          fill
          alt="LEL 2022"
          className="object-cover lg:rounded-md"
        />
        </div>
      </div>
      <main className="max-w-screen-lg mx-auto px-4 my-8 lg:my-12">
        <h1 className='text-4xl my-8'>shimpeko (Shimpei Kodama)</h1>
        <div>
          Not only does he enjoy endurance sports including swimming, cycling,
          and running, but he also finds pleasure in creative activities such as
          cooking and programming.
        </div>
        <div className="my-8"><Link href='https://www.linkedin.com/in/shimpeko/'>CV (Linkedin)</Link></div>
        <iframe height='160' width='300' frameborder='0' allowtransparency='true' scrolling='no' src='https://www.strava.com/athletes/16967037/activity-summary/0ed62664545ed0abd2035f7186136b16bbebc0d9'></iframe>
      </main>
    </>
  );
}
