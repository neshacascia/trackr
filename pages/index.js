import Head from 'next/head';
import Image from 'next/image';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>trackr</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white w-screen h-full flex flex-col px-6 pt-[72px] pb-8 md:h-screen md:px-12">
        <section className="w-full h-full flex flex-col justify-center items-center gap-10 pt-[72px] md:mt-8 lg:-mt-4 lg:flex-row">
          <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-10">
            <h1 className="font-home text-transparent text-3xl text-center lg:text-6xl font-semibold tracking-wider leading-[65px] lg:text-left gradient">
              Tracking made easy.
            </h1>
            <p className="text-[#292929] font-spartan text-lg text-center md:text-2xl lg:text-left w-[645px]">
              Whether you&apos;re an individual, small business owner, or
              freelancer, Trackr allows you to manage your invoices and expenses
              all in one place.
            </p>

            <SignUpButton
              afterSignInUrl="/dashboard"
              afterSignUpUrl="/dashboard"
            >
              <button className="text-white text-lg tracking-wider bg-brightPurple rounded py-4 px-8 hover:bg-hoverPurple md:text-xl">
                Get Started
              </button>
            </SignUpButton>
          </div>

          <Image
            src="/assets/preview.jpg"
            alt=""
            width={650}
            height={600}
            quality={90}
            className="object-fit mb-10"
          />
        </section>
      </main>
    </>
  );
}
