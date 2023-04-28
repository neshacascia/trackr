import Head from 'next/head';
import { useContext } from 'react';
import { Context } from '@/components/context/StateContext';

export default function Home() {
  const { isDarkMode } = useContext(Context);

  return (
    <>
      <Head>
        <title>Trackr</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main
        className={`${
          isDarkMode ? 'bg-darkPurple' : 'lightBg'
        } w-screen h-screen`}
      ></main>
    </>
  );
}
